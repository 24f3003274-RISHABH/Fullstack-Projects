from flask import (
    current_app as app,   # you used this pattern to avoid circular imports
    render_template,
    redirect,
    request,
    session,
    flash,
    url_for
)
from datetime import datetime
from sqlalchemy import func
from flask import jsonify
from datetime import date

from .models import *
from .database import db

@app.route('/')
def home():
  return render_template('welcome.html')

@app.route('/login-page',methods=['POST','GET'])
def login_page():
  return render_template('loginpage.html')


#this link redirect the registration page where all the types of registration link is available
@app.route('/reg-page',methods=['POST','GET'])
def reg_page():
  return render_template('regpage.html')


#Login Pages for students, companies and admin 
@app.route('/s-login', methods=['POST', 'GET'])
def s_login():
    
    if request.method == "POST":
        s_name = request.form.get("s_name")
        s_password = request.form.get("s_password")

        this_student = Student.query.filter_by(s_name=s_name).first()

        if this_student:
            if this_student.check_password(s_password):
                session['s_id'] = this_student.s_id
                session['s_name'] = this_student.s_name

                # Query companies and applications dynamically
                companies = Company.query.all()
                applications = Application.query.filter_by(a_s_id=this_student.s_id).all()

                return render_template(
                    "s_dash.html",
                    student=this_student,
                    companies=companies,
                    applications=applications
                )
            else:
                flash("Password is wrong")
                return redirect('/s-login')
        else:
            flash("Student doesn't exist")
            return redirect('/s-login')

    return render_template('slogin.html')

@app.route('/c-login',methods=['POST','GET'])
def c_login():
  if request.method=="POST":
    c_name=request.form["c_name"]
    c_password=request.form["c_password"]
    drives=PlacementDrive.query.all()
    this_company=Company.query.filter_by(c_name=c_name).first()
    if this_company:
      if this_company.check_password(c_password):
        session['c_id']=this_company.c_id
        session['c_name']=this_company.c_name
        return render_template("c_dash.html",company=this_company,drives=drives)
      else:
        return "password is wrong"
    else:
      return "Company doesn't exist"
  return render_template('clogin.html')



@app.route('/a-login',methods=['POST','GET'])
def a_login():
  if request.method=="POST":
    ad_name=request.form["ad_name"]
    ad_password=request.form["ad_password"]

    this_admin=Admin.query.filter_by(ad_name=ad_name).first()
    applications=Application.query.all()
    drives=PlacementDrive.query.all();
    companies = Company.query.all()
    students=Student.query.all()

    if this_admin:
      if this_admin.check_password(ad_password):
        session['ad_id']=this_admin.ad_id
        session['ad_name']=this_admin.ad_name
        return render_template("a_dash.html",admin=this_admin , applications=applications, drives=drives,companies=companies,students=students)      
      else:
        return "Password is wrong"
    else:
      return"User doesn't exist"
  return render_template('alogin.html')

#Registration pages for only student and company , Admin is only one it will already registered in the database so no need of registration page for admin

@app.route('/s-reg',methods=['POST','GET'])
def s_reg():
  if request.method=="POST":
    s_name=request.form["s_name"]
    s_email=request.form["s_email"]
    s_password=request.form["s_password"]
    s_roll_number=request.form["s_roll_number"]
    s_branch=request.form["s_branch"]
    s_cgpa=request.form["s_cgpa"]
    s_phone=request.form["s_phone"]
    s_resume_link = request.form.get("s_resume_link", "")
    scgpa=float(s_cgpa)
    sname=Student.query.filter_by(s_name=s_name).first()
    semail=Student.query.filter_by(s_email=s_email).first()
    if sname or semail:
      flash("Student name or email already exists! Please choose a different name or email.")
      return redirect('/s-reg')
    else:
      new_student=Student(s_name=s_name,s_email=s_email,s_roll_number=s_roll_number,s_branch=s_branch,s_cgpa=s_cgpa,s_phone=s_phone,s_resume_link=s_resume_link)
      new_student.set_password(s_password)
      db.session.add(new_student)
      db.session.commit()
    flash("Student registered successfully! Please login to continue.")
    return redirect('/s-login')
  return render_template('sreg.html')

@app.route('/c-reg',methods=['POST','GET'])
def c_reg():
  if request.method=="POST":
    c_name=request.form["c_name"]
    c_email=request.form["c_email"]
    c_password=request.form["c_password"]
    c_hr_contact=request.form["c_hr_contact"]
    c_phone=request.form["c_phone"]
    c_website=request.form["c_website"]
    c_industry=request.form["c_industry"]
    c_desc=request.form["c_desc"]
    cname=Company.query.filter_by(c_name=c_name).first()
    cemail=Company.query.filter_by(c_email=c_email).first()
    if cname or cemail:
      flash("Company name or email already exists! Please choose a different name or email.")
      return redirect('/c-reg')
    else:
      new_company=Company(c_name=c_name,c_email=c_email,c_hr_contact=c_hr_contact,c_phone=c_phone , c_website=c_website, c_industry=c_industry, c_desc=c_desc)
      new_company.set_password(c_password)
      db.session.add(new_company)
      db.session.commit()
    flash("Company registered successfully! Please login to continue.")
    return redirect('/c-login')
  return render_template('creg.html')

#Dash boards
@app.route('/a-dash', methods=['GET','POST'])
def a_dash():
    return render_template('a_dash.html')

@app.route('/s-dash', methods=['GET', 'POST'])
def s_dash():
    if 's_id' not in session:
        flash("Please log in first.")
        return redirect('/s-login')

    student = Student.query.get(session['s_id'])
    applications = Application.query.filter_by(a_s_id=student.s_id).all()
    companies = Company.query.all()

    return render_template(
        "s_dash.html",
        student=student,
        applications=applications,
        companies=companies
    )

@app.route('/c-dash',methods=['POST','GET'])
def c_dash():
  return render_template('c_dash.html')



@app.route('/student-application',methods=['POST','GET'])
def student_application():
  return render_template('student_application.html')  
@app.route('/company-details',methods=['POST','GET'])
def company_details():
  return render_template('company_details.html')


@app.route('/about',methods=['POST','GET'])
def about():
  return render_template('about.html')


@app.route('/update-drive-details',methods=['POST','GET'])
def update_drive_details():
  return render_template('update_drive_details.html')


@app.route('/create-drive', methods=['POST', 'GET'])
def create_drive():
    if request.method == 'POST':
        # ✅ Use the same key you set in c_login
        p_c_id = session.get("c_id")
        if not p_c_id:
            return "Error: Company ID not found in session"

        p_job_title = request.form.get("p_job_title")
        p_job_desc = request.form.get("p_job_desc")
        p_elig_criteria = request.form.get("p_elig_criteria")
        p_min_cgpa = request.form.get("p_min_cgpa")
        p_package = request.form.get("p_package")
        p_location = request.form.get("p_location")
        deadline_str = request.form.get("p_app_deadline")
        deadline_date = datetime.strptime(deadline_str, "%Y-%m-%d").date()

        new_drive = PlacementDrive(
            p_c_id=p_c_id,
            p_job_title=p_job_title,
            p_job_desc=p_job_desc,
            p_elig_criteria=p_elig_criteria,
            p_min_cgpa=p_min_cgpa,
            p_package=p_package,
            p_location=p_location,
            p_app_deadline=deadline_date
        )

        db.session.add(new_drive)
        db.session.commit()
        return redirect('/c-dash')

    return render_template("create_drive.html")



@app.route('/c-d-dash',methods=['POST','GET'])
def c_d_dash():
  return render_template("c_d_dash.html")

@app.route('/drive/<int:company_id>')
def drive_details(company_id):
    company = Company.query.get_or_404(company_id)
    return render_template("drive_details.html", company=company)

@app.route('/s-application', methods=['POST', 'GET'])
def s_application():
    if 's_id' not in session:
        flash("Please log in first.")
        return redirect('/s-login')

    if request.method == "POST":
        a_s_id = session['s_id']   # auto-fill from session
        a_p_id = request.form.get("a_p_id")

        # Check if application already exists
        existing_app = Application.query.filter_by(a_s_id=a_s_id, a_p_id=a_p_id).first()
        if existing_app:
            flash("You have already applied for this placement drive.")
            return redirect('/s-dash')

        # Create new application
        new_app = Application(a_s_id=a_s_id, a_p_id=a_p_id)
        db.session.add(new_app)
        db.session.commit()

        # Fetch placement drive details
        drive = PlacementDrive.query.get(a_p_id)

        flash("Application submitted successfully!")
        return render_template("s_dash.html", drive=drive, application=new_app)

    return render_template("s_application.html")