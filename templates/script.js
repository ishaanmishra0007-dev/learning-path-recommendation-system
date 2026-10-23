/* Learning Path Recommendation System - vanilla JS, data in localStorage */

// ---------- 1. REAL RESOURCE LINKS (key -> [label, url]) ----------
var R = {
  py: ["Python Docs", "https://docs.python.org/3/tutorial/"],
  fcc: ["freeCodeCamp (YouTube)", "https://www.youtube.com/@freecodecamp"],
  cs: ["Corey Schafer (YouTube)", "https://www.youtube.com/@coreyms"],
  sq: ["StatQuest (YouTube)", "https://www.youtube.com/@statquest"],
  b3: ["3Blue1Brown (YouTube)", "https://www.youtube.com/@3blue1brown"],
  pm: ["Professor Messer (Video)", "https://www.professormesser.com/"],
  pd: ["pandas Docs", "https://pandas.pydata.org/docs/"],
  np: ["NumPy Docs", "https://numpy.org/doc/"],
  sk: ["scikit-learn Docs", "https://scikit-learn.org/stable/getting_started.html"],
  mpl: ["Matplotlib Docs", "https://matplotlib.org/stable/users/index.html"],
  sea: ["Seaborn Docs", "https://seaborn.pydata.org/"],
  git: ["Git Docs", "https://git-scm.com/doc"],
  gh: ["GitHub Docs", "https://docs.github.com/"],
  mdn: ["MDN Web Docs", "https://developer.mozilla.org/"],
  http: ["MDN HTTP", "https://developer.mozilla.org/en-US/docs/Web/HTTP"],
  owasp: ["OWASP", "https://owasp.org/"],
  ps: ["PortSwigger Web Security Academy", "https://portswigger.net/web-security"],
  net: ["Cisco Networking Academy", "https://www.netacad.com/"],
  pbi: ["Power BI Learning (Microsoft)", "https://learn.microsoft.com/en-us/training/powerplatform/power-bi/"],
  tab: ["Tableau Training", "https://www.tableau.com/learn/training"],
  kh: ["Khan Academy Math", "https://www.khanacademy.org/math"],
  ks: ["Khan Academy Statistics", "https://www.khanacademy.org/math/statistics-probability"],
  pg: ["PostgreSQL Docs", "https://www.postgresql.org/docs/"],
  sql: ["W3Schools SQL", "https://www.w3schools.com/sql/"],
  xl: ["Excel Support (Microsoft)", "https://support.microsoft.com/en-us/excel"],
  kg: ["Kaggle Learn", "https://www.kaggle.com/learn"],
  cs50: ["Harvard CS50", "https://cs50.harvard.edu/x/"],
  rg: ["Refactoring Guru", "https://refactoring.guru/design-patterns"],
  sd: ["System Design Primer", "https://github.com/donnemartin/system-design-primer"],
  vg: ["VisuAlgo", "https://visualgo.net/"],
  lc: ["LeetCode", "https://leetcode.com/"],
  lj: ["Linux Journey", "https://linuxjourney.com/"],
  thm: ["TryHackMe", "https://tryhackme.com/"],
  nist: ["NIST SP 800-61 Incident Handling", "https://csrc.nist.gov/pubs/sp/800/61/r2/final"],
  cp: ["Cryptopals", "https://cryptopals.com/"],
  jest: ["Jest Docs", "https://jestjs.io/docs/getting-started"]
};

// ---------- 2. LEARNING PATHS: career -> [objective, [[stage, "Topic:key,key;Topic:key"], ...]] ----------
var P = {
  "Software Engineer": ["Become job-ready for an entry-level Software Engineering role.", [
    ["Programming Fundamentals", "Variables & Data Types:py,cs;Control Flow:py,cs;Functions:py;Arrays:py;Object-Oriented Programming:py,cs"],
    ["Data Structures & Algorithms", "Arrays:cs50;Linked Lists:vg;Stacks & Queues:vg;Trees:vg;Graphs:vg;Sorting:vg;Searching:vg;Dynamic Programming:lc,fcc"],
    ["Development Tools", "Git:git,fcc;GitHub:gh;Linux Basics:lj;Debugging:cs50"],
    ["Databases", "SQL:sql,pg;Relational Databases:pg;Database Design:fcc;Transactions:pg"],
    ["Web Development", "HTML:mdn,fcc;CSS:mdn;JavaScript:mdn,fcc;HTTP:http;REST APIs:mdn,fcc"],
    ["Software Engineering", "Testing:jest;Clean Code:rg;Design Patterns:rg;System Design Fundamentals:sd"],
    ["Projects", "Beginner Project:fcc;Intermediate Project:mdn;Full-Stack Project:fcc;Capstone Project:gh"],
    ["Job Preparation", "Resume:fcc;GitHub Portfolio:gh;DSA Interview Preparation:lc;Technical Interviews:lc,fcc;Behavioral Interviews:fcc"]]],
  "Data Scientist": ["Become job-ready for an entry-level Data Science role.", [
    ["Python", "Python Fundamentals:py,cs;Functions:py;OOP:py,cs;File Handling:py"],
    ["Mathematics", "Linear Algebra:kh,b3;Probability:ks;Statistics:ks,sq;Calculus Basics:kh,b3"],
    ["Data Handling", "NumPy:np,fcc;Pandas:pd,fcc;Data Cleaning:pd,kg;Data Preprocessing:sk,kg"],
    ["Data Visualization", "Matplotlib:mpl;Seaborn:sea;Exploratory Data Analysis:kg,pd"],
    ["SQL", "Queries:sql;Joins:sql,pg;Aggregations:sql;Subqueries:pg;Window Functions:pg"],
    ["Machine Learning", "Supervised Learning:sk,sq;Unsupervised Learning:sk,sq;Regression:sk;Classification:sk;Clustering:sk;Model Evaluation:sk,sq"],
    ["Projects", "Data Analysis Project:kg;ML Project:kg,sk;End-to-End Project:kg,fcc"],
    ["Job Preparation", "Portfolio:gh,kg;Resume:fcc;Interview Preparation:lc,sq"]]],
  "Data Analyst": ["Become job-ready for an entry-level Data Analyst role.", [
    ["Excel", "Excel Basics:xl;Formulas & Functions:xl;Pivot Tables:xl"],
    ["SQL", "Queries:sql;Joins:sql;Aggregations:sql,pg"],
    ["Statistics", "Descriptive Statistics:ks;Probability Basics:ks;Hypothesis Testing:ks,sq"],
    ["Python", "Python Basics:py,cs;Functions:py"],
    ["Pandas", "DataFrames:pd;Filtering & Grouping:pd,kg"],
    ["Data Cleaning", "Missing Values:pd,kg;Duplicates & Outliers:pd"],
    ["Data Visualization", "Charts with Matplotlib:mpl;Charts with Seaborn:sea"],
    ["Power BI / Tableau", "Power BI:pbi;Tableau:tab"],
    ["Business Analytics", "KPIs & Metrics:pbi;Dashboard Storytelling:tab"],
    ["Projects & Interview Preparation", "Dashboard Project:pbi,kg;Analysis Project:kg;Portfolio:gh;Interview Preparation:lc,fcc"]]],
  "Cybersecurity Analyst": ["Become job-ready for an entry-level Cybersecurity Analyst role.", [
    ["Computer Fundamentals", "How Computers Work:cs50;Hardware & Software:pm"],
    ["Networking", "TCP/IP & OSI Model:net,pm;DNS & HTTP:http;Firewalls:net"],
    ["Linux", "Linux Basics:lj;Permissions & Processes:lj"],
    ["Python", "Python Basics:py;Scripting for Security:py,cs"],
    ["Operating Systems", "Windows & Linux Internals:pm,lj;Processes & Memory:cs50"],
    ["Cybersecurity Fundamentals", "CIA Triad & Threats:pm,thm;Security Controls:owasp,pm"],
    ["Cryptography", "Hashing & Encryption:cp,pm;Public Key Basics:cp,pm"],
    ["Web Security", "OWASP Top 10:owasp,ps;SQL Injection & XSS:ps;Authentication Flaws:ps"],
    ["Security Operations", "Logging & Monitoring:thm;SIEM Basics:thm"],
    ["Incident Response", "IR Lifecycle:nist;Digital Forensics Basics:thm,nist"],
    ["Security Labs / Projects", "Hands-on Labs:thm,ps;Home Lab Project:thm;Capture the Flag:thm"],
    ["Interview Preparation", "Security Concepts Review:pm,owasp;Mock Interviews:thm"]]]
};

// ---------- 3. QUIZ: each option = [text, points "SE DS DA CS", reason shown in explanation] ----------
var QC = ["Software Engineer", "Data Scientist", "Data Analyst", "Cybersecurity Analyst"];
var Q = [
  ["What would you most enjoy building?", [
    ["A web or mobile application", "3100", "Strong interest in building applications"],
    ["A machine-learning model", "0320", "Interest in machine learning"],
    ["A business dashboard", "0130", "Interest in turning data into reports and dashboards"],
    ["A security system", "1003", "Interest in security"]]],
  ["Which school subject do you like most?", [
    ["Programming / logic", "3110", "Strong interest in programming"],
    ["Mathematics", "1300", "Strong interest in mathematics"],
    ["Statistics", "0230", "Interest in statistics"],
    ["Computer networks", "1003", "Interest in networking"]]],
  ["In your free time you would rather...", [
    ["Write code to build something", "3100", "Enjoy writing code"],
    ["Look for patterns in a dataset", "0320", "Interest in finding patterns in data"],
    ["Make charts and summarise numbers", "0130", "Enjoy working with data and charts"],
    ["Investigate how systems can be broken", "1003", "Enjoy investigating how systems fail"]]],
  ["Something stops working. What do you do first?", [
    ["Read the code and debug it", "3100", "Analytical, debugging mindset"],
    ["Form a hypothesis and test it", "0310", "Scientific, experimental thinking"],
    ["Study the numbers and logs to find the cause", "0132", "Analytical thinking with data"],
    ["Trace who or what caused it", "1003", "Interest in investigating problems"]]],
  ["How interested are you in AI?", [
    ["Very interested - I want to build it", "1300", "Interest in AI"],
    ["I would use AI inside apps I build", "2100", "Interest in using AI in applications"],
    ["I want data to support business decisions", "0130", "Interest in data-driven decisions"],
    ["Not much", "1001", ""]]],
  ["How comfortable are you with maths?", [
    ["Love advanced maths (algebra, calculus)", "0300", "Comfortable with advanced mathematics"],
    ["Comfortable with statistics and percentages", "0230", "Comfortable with statistics"],
    ["Basic maths is enough for me", "2001", ""],
    ["Comfortable with logic, binary and numbers in networks", "1002", "Comfortable with logic and binary"]]],
  ["Which team would you join?", [
    ["A product team shipping features", "3000", "Enjoy shipping working software"],
    ["A research lab building models", "0300", "Interest in research and modelling"],
    ["A business team guiding decisions", "0130", "Interest in business analysis"],
    ["A security team defending systems", "0003", "Interest in defending systems"]]],
  ["Which problem excites you most?", [
    ["Making an app fast and reliable", "3100", "Interest in software quality"],
    ["Predicting the future from data", "0310", "Interest in prediction from data"],
    ["Finding trends in sales data", "0130", "Interest in finding trends in data"],
    ["Stopping a ransomware attack", "0003", "Interest in stopping attacks"]]]
];

// ---------- 4. DATABASE (localStorage) ----------
function build() {
  var c = {};
  for (var k in P) {
    c[k] = { obj: P[k][0], stages: P[k][1].map(function (s) {
      return { n: s[0], t: s[1].split(";").map(function (x) {
        var a = x.split(":");
        return { n: a[0], r: a[1].split(",").map(function (key) { return { l: R[key][0], u: R[key][1] }; }) };
      }) };
    }) };
  }
  return c;
}
var db = null;
try { db = JSON.parse(localStorage.getItem("lprs_db")); } catch (e) {}
if (!db) {
  db = { careers: build(), users: [
    { u: "student", p: "student123", role: "student", name: "Student", career: "", quiz: null, done: [], cur: "" },
    { u: "teacher", p: "teacher123", role: "teacher", name: "Teacher" },
    { u: "admin", p: "admin123", role: "admin", name: "Admin" }] };
  save();
}
function save() { localStorage.setItem("lprs_db", JSON.stringify(db)); }

// ---------- 5. HELPERS ----------
function $(id) { return document.getElementById(id); }
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
function me() { var s = localStorage.getItem("lprs_session"); return db.users.filter(function (x) { return x.u === s; })[0]; }
function go(p) { location.hash = p; render(); }
// all topics of a career in order, each with a unique id
function flat(c) {
  var o = [];
  if (!db.careers[c]) return o;
  db.careers[c].stages.forEach(function (s, i) {
    s.t.forEach(function (t) { o.push({ id: c + "|" + i + "|" + t.n, si: i, s: s.n, t: t }); });
  });
  return o;
}
// progress + RECOMMENDATION RULE: next topic = first topic not yet completed
function stat(u) {
  var f = flat(u.career), d = f.filter(function (x) { return u.done.indexOf(x.id) > -1; }).length;
  return { f: f, d: d, n: f.length, pct: f.length ? Math.round(100 * d / f.length) : 0,
    next: f.filter(function (x) { return u.done.indexOf(x.id) < 0; })[0] };
}
function links(t) {
  return t.r.map(function (r) { return '<a href="' + esc(r.u) + '" target="_blank" rel="noopener">' + esc(r.l) + '</a>'; }).join("<br>");
}
function studentsOnly(u) { return u.role !== "student" ? "<p>This page is for students only.</p>" : ""; }

// ---------- 6. NAVIGATION + ROUTER ----------
function nav(u) {
  var h = '<a href="#home">Home</a>';
  if (u) {
    h += ' | <a href="#finder">Career Finder</a> | <a href="#path">My Learning Path</a> | <a href="#progress">Progress</a>';
    if (u.role !== "student") h += ' | <a href="#' + u.role + '">' + (u.role === "admin" ? "Admin" : "Teacher") + ' Panel</a>';
  }
  h += ' | <a href="."></a>';
  if (u) h += ' | <a href="#" onclick="logout();return false">Logout</a>';
  $("nav").innerHTML = h;
}
function render() {
  var u = me(), p = (location.hash || "#home").slice(1);
  nav(u);
  if (p === "about") { $("main").innerHTML = about(); return; }
  if (!u) { $("main").innerHTML = loginPage(); return; }
  var pages = { home: home, finder: finder, quiz: quiz, result: result, path: path, progress: progress, teacher: teacher, admin: admin };
  var guard = (p === "admin" && u.role !== "admin") || (p === "teacher" && u.role === "student");
  $("main").innerHTML = guard ? "<p>Access denied.</p>" : (pages[p] || home)(u);
}
window.onhashchange = render;

// ---------- 7. LOGIN ----------
function loginPage() {
  return '<h2>Login</h2><form onsubmit="return login(this)"><table><tr><td>Username:</td><td><input name="u"></td></tr>' +
    '<tr><td>Password:</td><td><input type="password" name="p"></td></tr></table><p><input type="submit" value="Login"></p></form>' +
    '<p></p>';
}
function login(f) {
  var x = db.users.filter(function (a) { return a.u === f.u.value && a.p === f.p.value; })[0];
  if (!x) { alert("Wrong username or password."); return false; }
  localStorage.setItem("lprs_session", x.u);
  go("home");
  return false;
}
function logout() { localStorage.removeItem("lprs_session"); go("home"); }

// ---------- 8. HOME + CAREER FINDER ----------
function home(u) {
  var h = "<h2>Welcome, " + esc(u.name) + "</h2><p>Find the right career and get a structured learning path.</p>";
  if (u.role !== "student") return h + "<p>Use the panel link in the menu above.</p>";
  h += "<h3>How it works</h3><ol><li>Choose a career, or take the career quiz</li><li>The system recommends a career</li>" +
    "<li>A structured learning path is generated</li><li>Learn from official documentation and videos</li>" +
    "<li>Mark topics as completed</li><li>The system recommends your next topic</li></ol>" +
    '<h3>Choose one</h3><ul><li><a href="#finder"><b>1. I know what career I want</b></a></li>' +
    '<li><a href="#quiz"><b>2. Help me choose a career</b></a></li></ul>';
  if (u.career && db.careers[u.career]) {
    h += "<p>Your career: " + esc(u.career) + " (" + stat(u).pct + '% complete). <a href="#path">Continue learning</a></p>';
  }
  return h;
}
function finder(u) {
  if (u.role !== "student") return studentsOnly(u);
  var o = Object.keys(db.careers).map(function (c) { return "<option>" + esc(c) + "</option>"; }).join("");
  return '<h2>Career Finder</h2><h3>1. I know what career I want</h3><h4>Choose Your Career</h4>' +
    '<form onsubmit="return pick(this)"><p>Career: <select name="c">' + o + '</select> <input type="submit" value="Generate Learning Path"></p></form>' +
    '<h3>2. Help me choose a career</h3><p><a href="#quiz">Take the 8-question career quiz</a></p>';
}
function pick(f) { setCareer(f.c.value); return false; }
function setCareer(c) {
  var u = me();
  if (!db.careers[c]) { alert("That career no longer exists."); return; }
  u.career = c;
  var s = stat(u);
  u.cur = s.next ? s.next.t.n : "Completed";
  save();
  go("path");
}

// ---------- 9. QUIZ + SCORING ----------
function quiz(u) {
  if (u.role !== "student") return studentsOnly(u);
  var h = "<h2>Career Quiz</h2><p>Answer all 8 questions.</p><form onsubmit=\"return submitQ(this)\">";
  Q.forEach(function (q, i) {
    h += "<h3>" + (i + 1) + ". " + q[0] + "</h3>";
    q[1].forEach(function (o, j) {
      h += '<label><input type="radio" name="q' + i + '" value="' + j + '"> ' + "ABCD"[j] + ". " + o[0] + "</label>";
    });
  });
  return h + '<p><input type="submit" value="Get My Recommendation"></p></form>';
}
function submitQ(f) {
  var sc = [0, 0, 0, 0], picks = [], i, k;
  for (i = 0; i < Q.length; i++) {
    var v = f["q" + i].value;
    if (v === "") { alert("Please answer question " + (i + 1) + "."); return false; }
    var o = Q[i][1][+v];
    picks.push(o);
    for (k = 0; k < 4; k++) sc[k] += +o[1][k];       // add points to each career
  }
  var top = sc.indexOf(Math.max.apply(null, sc)), why = [];
  picks.forEach(function (o) {                        // keep reasons from answers that favoured the winner
    if (+o[1][top] >= 2 && o[2] && why.indexOf(o[2]) < 0) why.push(o[2]);
  });
  var u = me();
  u.quiz = { s: sc, top: top, why: why };
  save();
  go("result");
  return false;
}
function result(u) {
  var q = u.quiz;
  if (u.role !== "student") return studentsOnly(u);
  if (!q) return '<p>Please take the <a href="#quiz">career quiz</a> first.</p>';
  var t = QC[q.top];
  var h = "<h2>Recommended Career</h2><p><b style=\"font-size:1.5em\">" + t + "</b></p>" +
    "<p>Based on your answers, " + t + " is the strongest match.</p><h3>Why this career was recommended</h3><p>Your answers indicate:</p><ul>" +
    q.why.map(function (w) { return "<li>" + esc(w) + "</li>"; }).join("") + "</ul><p>Therefore: <b>" + t + " was your strongest match.</b></p>" +
    "<h3>All scores</h3><table><tr><th>Career</th><th>Score</th></tr>";
  QC.forEach(function (c, i) { h += "<tr><td>" + c + "</td><td>" + q.s[i] + "</td></tr>"; });
  return h + '</table><p><input type="button" value="Start Recommended Learning Path" onclick="setCareer(\'' + t + '\')"> ' +
    '<input type="button" value="Choose Another Career" onclick="go(\'finder\')"></p>';
}

// ---------- 10. LEARNING PATH + PROGRESS ----------
function path(u) {
  if (u.role !== "student") return studentsOnly(u);
  var c = u.career;
  if (!db.careers[c]) return '<h2>My Learning Path</h2><p>No career selected yet. Go to the <a href="#finder">Career Finder</a>.</p>';
  var s = stat(u), C = db.careers[c], idx = 0;
  var h = "<h2>" + esc(c) + " Learning Path</h2><p>Career: " + esc(c) + "<br>Objective: " + esc(C.obj) + "</p>" +
    "<p>Completed: " + s.d + " / " + s.n + " topics<br>Progress: " + s.pct + "%</p>";
  C.stages.forEach(function (st, i) {
    var l = s.f.filter(function (x) { return x.si === i; });
    if (l.length && l.every(function (x) { return u.done.indexOf(x.id) > -1; })) h += "<p><i>You have already completed " + esc(st.n) + ".</i></p>";
  });
  if (s.next) h += "<p>Next recommended topic: <b>" + esc(s.next.t.n) + "</b> (" + esc(s.next.s) + ') <input type="button" value="Continue Learning" onclick="cont()"></p>';
  else if (s.n) h += "<p><b>Congratulations! You have completed every topic.</b></p>";
  else h += "<p>This career has no topics yet. Ask the admin or a teacher to add some.</p>";
  C.stages.forEach(function (st, i) {
    h += "<h2>Stage " + (i + 1) + " - " + esc(st.n) + "</h2><table><tr><th>Topic</th><th>Resource</th><th>Status</th></tr>";
    st.t.forEach(function (t) {
      var f = s.f[idx], dn = u.done.indexOf(f.id) > -1, nx = s.next && s.next.id === f.id;
      h += '<tr' + (nx ? ' class="next" id="next"' : "") + "><td>" + esc(t.n) + (nx ? " <b>&lt;-- next</b>" : "") + "</td><td>" + links(t) +
        '</td><td><a href="#" onclick="tog(' + idx + ');return false">' + (dn ? "[&#10003;]" : "[ ]") + "</a></td></tr>";
      idx++;
    });
    h += "</table>";
  });
  return h;
}
function tog(i) {
  var u = me(), f = flat(u.career)[i], p = u.done.indexOf(f.id);
  if (p > -1) u.done.splice(p, 1); else u.done.push(f.id);
  var s = stat(u);
  u.cur = s.next ? s.next.t.n : "Completed";
  save();
  render();
}
function cont() { go("path"); var e = $("next"); if (e) e.scrollIntoView(); }
function progress(u) {
  if (u.role !== "student") return studentsOnly(u);
  var c = u.career;
  var h = "<h2>My Progress</h2>";
  if (!db.careers[c]) return h + '<p>No career selected yet. Go to the <a href="#finder">Career Finder</a>.</p>';
  var s = stat(u);
  h += "<table><tr><td>Student</td><td>" + esc(u.name) + "</td></tr><tr><td>Selected Career</td><td>" + esc(c) + "</td></tr>" +
    "<tr><td>Quiz Result</td><td>" + (u.quiz ? QC[u.quiz.top] : "Quiz not taken") + "</td></tr>" +
    "<tr><td>Learning Progress</td><td>Completed: " + s.d + " / " + s.n + " (" + s.pct + "%)</td></tr>" +
    "<tr><td>Current Recommendation</td><td><b>" + (s.next ? esc(s.next.t.n) : "All topics completed") + "</b></td></tr></table>";
  var done = s.f.filter(function (x) { return u.done.indexOf(x.id) > -1; });
  h += "<h3>Completed Topics</h3>" + (done.length ? "<ul>" + done.map(function (x) { return "<li>" + esc(x.t.n) + " (" + esc(x.s) + ")</li>"; }).join("") + "</ul>" : "<p>None yet.</p>");
  h += "<h3>Stage Summary</h3><table><tr><th>Stage</th><th>Done</th></tr>";
  db.careers[c].stages.forEach(function (st, i) {
    var l = s.f.filter(function (x) { return x.si === i; });
    h += "<tr><td>" + esc(st.n) + "</td><td>" + l.filter(function (x) { return u.done.indexOf(x.id) > -1; }).length + " / " + l.length + "</td></tr>";
  });
  return h + '</table><p><input type="button" value="Continue Learning" onclick="cont()"> <input type="button" value="Reset My Progress" onclick="resetP()"></p>';
}
function resetP() { if (confirm("Clear all your completed topics?")) { var u = me(); u.done = []; u.cur = ""; save(); render(); } }

// ---------- 11. TEACHER ----------
function teacher() {
  var h = "<h2>Teacher Panel</h2><h3>Students</h3><table><tr><th>Name</th><th>Career</th><th>Progress</th><th>Current Recommendation</th></tr>";
  db.users.filter(function (x) { return x.role === "student"; }).forEach(function (x) {
    var ok = db.careers[x.career], s = stat(x);
    h += "<tr><td>" + esc(x.name) + " (" + esc(x.u) + ")</td><td>" + (ok ? esc(x.career) : "-") + "</td><td>" +
      (ok ? s.d + " / " + s.n + " (" + s.pct + "%)" : "-") + "</td><td>" + (ok && s.next ? esc(s.next.t.n) : "-") + "</td></tr>";
  });
  h += "</table><h3>Courses (Careers)</h3><table><tr><th>Career</th><th>Stages</th><th>Topics</th></tr>";
  Object.keys(db.careers).forEach(function (c) { h += "<tr><td>" + esc(c) + "</td><td>" + db.careers[c].stages.length + "</td><td>" + flat(c).length + "</td></tr>"; });
  return h + "</table>" + resForm();
}
function resForm() {
  var o = Object.keys(db.careers).map(function (c) { return "<option>" + esc(c) + "</option>"; }).join("");
  return "<h3>Add / Edit Learning Resource</h3><p>Enter an existing topic to add a link to it, or a new topic name to create it. " +
    "Using an existing resource label replaces its URL (edit). Stage number = existing stage, or next new stage.</p>" +
    '<form onsubmit="return addRes(this)"><table><tr><td>Career</td><td><select name="c">' + o + "</select></td></tr>" +
    '<tr><td>Stage number</td><td><input name="s" size="3" value="1"></td></tr><tr><td>Topic name</td><td><input name="t"></td></tr>' +
    '<tr><td>Resource label</td><td><input name="l"></td></tr><tr><td>URL (http/https)</td><td><input name="u" size="40"></td></tr></table>' +
    '<p><input type="submit" value="Save Resource"></p></form>';
}
function addRes(f) {
  var C = db.careers[f.c.value], si = parseInt(f.s.value, 10) - 1, tn = f.t.value.trim(), l = f.l.value.trim(), url = f.u.value.trim();
  if (!C || !tn || !l || !/^https?:\/\//.test(url)) { alert("Fill every field. The URL must start with http:// or https://"); return false; }
  if (isNaN(si) || si < 0 || si > C.stages.length) { alert("Stage number must be between 1 and " + (C.stages.length + 1)); return false; }
  if (si === C.stages.length) C.stages.push({ n: "Stage " + (si + 1), t: [] });
  var t = C.stages[si].t.filter(function (x) { return x.n === tn; })[0];
  if (!t) { t = { n: tn, r: [] }; C.stages[si].t.push(t); }
  var r = t.r.filter(function (x) { return x.l === l; })[0];
  if (r) r.u = url; else t.r.push({ l: l, u: url });
  save(); alert("Resource saved."); render();
  return false;
}

// ---------- 12. ADMIN ----------
function admin(u) {
  var h = "<h2>Admin Panel</h2><h3>Users</h3><table><tr><th>Name</th><th>Username</th><th>Role</th><th></th></tr>";
  db.users.forEach(function (x, i) {
    h += "<tr><td>" + esc(x.name) + "</td><td>" + esc(x.u) + "</td><td>" + x.role + "</td><td>" +
      (x.role === "admin" ? "" : '<a href="#" onclick="delUser(' + i + ');return false">Remove</a>') + "</td></tr>";
  });
  h += '</table><h4>Add User</h4><form onsubmit="return addUser(this)"><table><tr><td>Name</td><td><input name="n"></td></tr>' +
    '<tr><td>Username</td><td><input name="u"></td></tr><tr><td>Password</td><td><input name="p"></td></tr>' +
    '<tr><td>Role</td><td><select name="r"><option>student</option><option>teacher</option></select></td></tr></table><p><input type="submit" value="Add User"></p></form>';
  h += "<h3>Careers</h3><table><tr><th>Career</th><th>Topics</th><th></th></tr>";
  Object.keys(db.careers).forEach(function (c, i) {
    h += "<tr><td>" + esc(c) + "</td><td>" + flat(c).length + '</td><td><a href="#" onclick="delCareer(' + i + ');return false">Remove</a></td></tr>';
  });
  h += '</table><h4>Add Career</h4><form onsubmit="return addCareer(this)"><table><tr><td>Name</td><td><input name="n"></td></tr>' +
    '<tr><td>Objective</td><td><input name="o" size="40"></td></tr></table><p><input type="submit" value="Add Career"></p></form>' +
    "<p>A new career starts empty: add its stages and topics with the resource form below.</p>";
  return h + teacher();
}
function addUser(f) {
  var n = f.n.value.trim(), un = f.u.value.trim(), p = f.p.value;
  if (!n || !un || !p) { alert("Fill every field."); return false; }
  if (db.users.some(function (x) { return x.u === un; })) { alert("Username already exists."); return false; }
  var x = { u: un, p: p, role: f.r.value, name: n };
  if (x.role === "student") { x.career = ""; x.quiz = null; x.done = []; x.cur = ""; }
  db.users.push(x); save(); render();
  return false;
}
function delUser(i) { if (confirm("Remove " + db.users[i].u + "?")) { db.users.splice(i, 1); save(); render(); } }
function addCareer(f) {
  var n = f.n.value.trim();
  if (!n || db.careers[n]) { alert("Enter a new, unique career name."); return false; }
  db.careers[n] = { obj: f.o.value.trim() || "Become job-ready for an entry-level " + n + " role.", stages: [] };
  save(); render();
  return false;
}
function delCareer(i) {
  var c = Object.keys(db.careers)[i];
  if (confirm("Remove career " + c + "?")) { delete db.careers[c]; save(); render(); }
}

// ---------- 13. ABOUT ----------
function about() {
  return "<h2>About</h2><p><b>Learning Path Recommendation System</b> is an academic prototype built with HTML, CSS and vanilla JavaScript only. There is no backend.</p>" +
    "<h3>How the recommendation works (rule-based)</h3><ul><li><b>Career quiz:</b> every answer adds points to the four careers; the highest total is recommended and the answers that favoured it are listed as reasons.</li>" +
    "<li><b>Learning path:</b> each career is a list of stages, each stage a list of topics, each topic has official documentation or video links.</li>" +
    "<li><b>Next topic:</b> the first topic in the path that the student has not completed.</li>" +
    "<li><b>Storage:</b> the browser's localStorage keeps users, careers, resources, quiz results and completed topics.</li></ul>" +
    '<p>Demo logins: student / student123, teacher / teacher123, admin / admin123.</p>';
}

render();
