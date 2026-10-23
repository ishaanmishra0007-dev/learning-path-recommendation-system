from flask import Flask, render_template, request, redirect
from db import get_connection
import random
import smtplib

from email.mime.text import MIMEText

app = Flask(__name__)

# ---------------- HOME ----------------

@app.route("/")
def home():
    return render_template("index.html")


# ---------------- LOGIN ----------------

@app.route("/login")
def login():
    return render_template("login.html")


# ---------------- SIGNUP ----------------

@app.route("/signup")
def signup():
    return render_template("signup.html")


# ---------------- REGISTER ----------------

@app.route("/register", methods=["POST"])
def register():

    full_name = request.form["full_name"]
    username = request.form["username"]
    email = request.form["email"]
    password = request.form["password"]
    confirm_password = request.form["confirm_password"]
    role = request.form["role"]

    if password != confirm_password:
        return "Passwords do not match."

    connection = get_connection()

    if connection is None:
        return "Database connection failed."

    cursor = connection.cursor()

    cursor.execute(
        "SELECT * FROM users WHERE username = %s",
        (username,)
    )

    if cursor.fetchone():
        cursor.close()
        connection.close()
        return "Username already exists."

    cursor.execute(
        "SELECT * FROM users WHERE email = %s",
        (email,)
    )

    if cursor.fetchone():
        cursor.close()
        connection.close()
        return "Email already exists."

    # Generate OTP
    otp = random.randint(100000, 999999)

    # Save OTP temporarily
    app.config["OTP"] = str(otp)

    # Save user details temporarily
    app.config["PENDING_USER"] = {
        "full_name": full_name,
        "username": username,
        "email": email,
        "password": password,
        "role": role
    }

    print("OTP:", otp)

    cursor.close()
    connection.close()

    return redirect("/verify_otp")


# ---------------- VERIFY OTP ----------------

@app.route("/verify_otp")
def verify_otp():
    return render_template("verify_otp.html")


@app.route("/confirm_otp", methods=["POST"])
def confirm_otp():

    entered_otp = request.form["otp"]

    if entered_otp != app.config.get("OTP"):
        return "Invalid OTP"

    user = app.config.get("PENDING_USER")

    connection = get_connection()

    if connection is None:
        return "Database connection failed."

    cursor = connection.cursor()

    cursor.execute(
        """
        INSERT INTO users
        (full_name, username, email, password, role)
        VALUES (%s, %s, %s, %s, %s)
        """,
        (
            user["full_name"],
            user["username"],
            user["email"],
            user["password"],
            user["role"]
        )
    )

    connection.commit()

    cursor.close()
    connection.close()

    return redirect("/login")

# ---------------- AUTHENTICATE ----------------

@app.route("/authenticate", methods=["POST"])
def authenticate():

    username = request.form["username"]
    password = request.form["password"]

    connection = get_connection()

    if connection is None:
        return "Database connection failed."

    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT *
        FROM users
        WHERE username = %s
        AND password = %s
        """,
        (username, password)
    )

    user = cursor.fetchone()
    if user:
        app.config["CURRENT_USER"] = user[1]


    cursor.close()
    connection.close()

    if user:

        role = user[5]

        if role == "student":
            return redirect("/student")

        elif role == "teacher":
            return redirect("/teacher")

        elif role == "admin":
            return redirect("/admin")

        else:
            return "Invalid role."

    else:
        return "Invalid Username or Password."


# ---------------- DASHBOARDS ----------------

@app.route("/student")
def student_dashboard():
    return render_template("student_dashboard.html")


@app.route("/teacher")
def teacher_dashboard():

    teacher_name = app.config.get(
        "CURRENT_USER",
        "Teacher"
    )

    return render_template(
        "teacher_dashboard.html",
        teacher_name=teacher_name
    )


@app.route("/admin")
def admin_dashboard():
    return render_template("admin_dashboard.html")


# ---------------- CAREERS ----------------

@app.route("/careers")
def careers():
    return render_template("careers.html")


# ---------------- QUIZ ----------------

@app.route("/quiz")
def quiz():
    return render_template("quiz.html")


# ---------------- SUBMIT QUIZ ----------------

@app.route("/submit_quiz", methods=["POST"])
def submit_quiz():

    selected_options = [
        request.form.get("q1"),
        request.form.get("q2"),
        request.form.get("q3"),
        request.form.get("q4"),
        request.form.get("q5")
    ]

    connection = get_connection()

    if connection is None:
        return "Database connection failed."

    cursor = connection.cursor()

    scores = {}

    for option_id in selected_options:

        cursor.execute(
            """
            SELECT career_id, weight
            FROM quiz_options
            WHERE option_id = %s
            """,
            (option_id,)
        )

        result = cursor.fetchone()

        career_id = result[0]
        weight = result[1]

        scores[career_id] = scores.get(career_id, 0) + weight

    recommended_career = max(scores, key=scores.get)
    highest_score = scores[recommended_career]

    cursor.execute(
        """
        SELECT career_name, description
        FROM careers
        WHERE career_id = %s
        """,
        (recommended_career,)
    )

    career = cursor.fetchone()

    career_name = career[0]
    description = career[1]

    cursor.execute(
        """
        SELECT topic_name
        FROM topics
        WHERE career_id = %s
        ORDER BY topic_order
        """,
        (recommended_career,)
    )

    topics = cursor.fetchall()

    # Save result in database
    cursor.execute(
        """
        INSERT INTO quiz_results
        (student_id, career_id, score)
        VALUES (%s, %s, %s)
        """,
        (1, recommended_career, highest_score)
    )

    connection.commit()

    cursor.close()
    connection.close()

    return render_template(
        "recommendation.html",
        career_name=career_name,
        description=description,
        score=highest_score,
        topics=topics
    )


# ---------------- CERTIFICATE ----------------
from datetime import datetime
@app.route("/certificate", methods=["POST"])
def certificate():

    career_name = request.form["career_name"]
    score = request.form["score"]

    student_name = app.config.get(
        "CURRENT_USER",
        "Student"
    )

    current_date = datetime.now().strftime("%d-%m-%Y")

    return render_template(
        "certificate.html",
        student_name=student_name,
        career_name=career_name,
        score=score,
        date=current_date
    )

@app.route("/add-resource")
def add_resource():

    return render_template(
        "add_resource.html"
    )

@app.route('/software_engineer')
def software_engineer():
    return render_template('software_engineer.html')


@app.route('/data_scientist')
def data_scientist():
    return render_template('data_scientist.html')


@app.route('/data_analyst')
def data_analyst():
    return render_template('data_analyst.html')


@app.route('/cybersecurity_analyst')
def cybersecurity_analyst():
    return render_template('cybersecurity_analyst.html')



# ---------------- RUN ----------------

if __name__ == "__main__":
    app.run(debug=True)