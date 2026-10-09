export class EmployeeModel{
  empid:number;
  name:string;
  city:string;
  state:string;
  emailid:string;
  contactNo:string;
  address:string;
  pincode:string;

  constructor(){
    this.empid=0,
    this.name="",
    this.address="",
    this.city="",
    this.state="",
    this.emailid="",
    this.contactNo="",
    this.pincode=""
  }
}