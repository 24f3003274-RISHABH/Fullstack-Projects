from application.database import db
from datetime import datetime
from zoneinfo import ZoneInfo

IST = ZoneInfo("Asia/Kolkata")


from werkzeug.security import generate_password_hash, check_password_hash

class Admin(db.Model):
  __tablename__='admin'
  ad_id=db.Column(db.Integer,primary_key=True,autoincrement=True)
  ad_name=db.Column(db.String(80),unique=True,nullable=False)
  ad_email=db.Column(db.String(120),unique=True,nullable=False)
  ad_password=db.Column(db.String(256),nullable=False)

  def set_password(self,password):
    self.ad_password=generate_password_hash(password)
  def check_password(self,password):
    return check_password_hash(self.ad_password,password)
  
  def __repr__(self):
    return f"<Admin {self.ad_name}>"
  
class Company(db.Model):
  __tablename__='company'
  c_id=db.Column(db.Integer,primary_key=True,autoincrement=True)
  c_name=db.Column(db.String(150),nullable=False)
  c_email=db.Column(db.String(120),unique=True,nullable=False)
  c_password=db.Column(db.String(256),nullable=False)
  c_hr_contact=db.Column(db.String(100),nullable=False)
  c_phone=db.Column(db.String(20))
  c_website=db.Column(db.String(200))
  c_industry=db.Column(db.String(100))
  c_desc=db.Column(db.Text)

  c_status=db.Column(db.String(20),default="pending",nullable=False)
  c_is_blacklisted=db.Column(db.Boolean,default=False,nullable=False)
  c_created_at=db.Column(db.DateTime,default=lambda: datetime.now(IST))

  drives=db.relationship("PlacementDrive",backref="company" ,lazy=True,cascade="all, delete-orphan")

  def set_password(self, password):
    self.c_password = generate_password_hash(password)

  def check_password(self, password):
    return check_password_hash(self.c_password, password)
  
  @property
  def is_approved(self):
    return self.c_status=="approved" and not self.c_is_blacklisted
  
  def __repr__(self):
    return f"<Company {self.c_name}>"

class Student(db.Model):
  __tablename__='student'
  s_id=db.Column(db.Integer,primary_key=True,autoincrement=True)
  s_name=db.Column(db.String(120),nullable=False)
  s_email=db.Column(db.String(120),unique=True,nullable=False)
  s_password=db.Column(db.String(200),nullable=False)
  s_roll_number=db.Column(db.String(50),unique=True,nullable=False)
  s_branch=db.Column(db.String(100))
  s_cgpa=db.Column(db.Float,default=0.0)
  s_phone=db.Column(db.String(20))
  s_resume_link=db.Column(db.String(300))
  s_is_blacklisted=db.Column(db.Boolean,default=False,nullable=False)
  s_is_active=db.Column(db.Boolean,default=True,nullable=False)
  s_created_at=db.Column(db.DateTime,default=lambda: datetime.now(IST))

  applications=db.relationship("Application",backref="student",lazy=True,cascade="all, delete-orphan")

  
  def set_password(self,password):
    self.s_password=generate_password_hash(password)
  def check_password(self,password):
    return check_password_hash(self.s_password,password)
  
  
  @property
  def is_eligible(self):
    return self.s_is_active and not self.s_is_blacklisted

  def __repr__(self):
    return f"<Student {self.s_name} ({self.s_roll_number})>"
  
class PlacementDrive(db.Model):
  __tablename__='placement_drive'
  p_id=db.Column(db.Integer,primary_key=True,autoincrement=True)
  p_c_id=db.Column(db.Integer,db.ForeignKey("company.c_id"),nullable=False)
  p_job_title=db.Column(db.String(150),nullable=False)
  p_job_desc=db.Column(db.Text)
  p_elig_criteria=db.Column(db.Text)
  p_min_cgpa=db.Column(db.Float,default=0.0)
  p_package=db.Column(db.String(150))
  p_location=db.Column(db.String(150))
  p_app_deadline=db.Column(db.Date,nullable=False)
# pending | approved | rejected | closed
  p_status=db.Column(db.String(20),default="pending",nullable=False)
  p_created_at=db.Column(db.DateTime,default=lambda:datetime.now(IST))

  application=db.relationship("Application", backref="drive",lazy=True,cascade="all, delete-orphan")

  @property
  def is_open(self):
    from datetime import date
    return (
        self.p_status=="approved"
        and self.P_app_deadline>=date.today()
    )
  
  @property
  def applicant_count(self):
    return len(self.application)
  
  def __repr__(self):
    return f"<PlacementDrive {self.p_job_title} by company_id={self.p_c_id}>"
  
class Application(db.Model):
  __tablename__='application'
  a_id=db.Column(db.Integer,primary_key=True)
  a_s_id=db.Column(db.Integer,db.ForeignKey("student.s_id"),nullable=False)
  a_p_id=db.Column(db.Integer,db.ForeignKey("placement_drive.p_id"),nullable=False)
  a_applied_at=db.Column(db.DateTime , default=lambda:datetime.now(IST))
# applied | shortlisted | selected | rejected
  a_status= db.Column(db.String(20), default="applied", nullable=False)

  #Prevents duplicate applications at the database level
  __table_args__ = (
        db.UniqueConstraint("a_s_id", "a_p_id", name="uq_student_drive"),
    )
  def __repr__(self):
    return f"<Application student={self.a_s_id} drive={self.a_p_id} status=a_status>"
  
