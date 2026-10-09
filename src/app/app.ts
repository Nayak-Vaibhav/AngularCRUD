import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeModel } from './Model/Employee';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  employeeForm:FormGroup=new FormGroup({});
  employeeObj:EmployeeModel=new EmployeeModel();
  employeeList:EmployeeModel[]=[];

  constructor(){
    this.createFrom();
    const oldData=localStorage.getItem("EmpData");
      if(oldData !=null) {
        const parseData = JSON.parse(oldData);
        this.employeeList=parseData;
      }
  }

  createFrom(){
    this.employeeForm=new FormGroup({
     empid:new FormControl(this.employeeObj.empid),
     name:new FormControl(this.employeeObj.name),
     city:new FormControl(this.employeeObj.city),
     address:new FormControl(this.employeeObj.address),
     state:new FormControl(this.employeeObj.state),
     pincode:new FormControl(this.employeeObj.pincode),
     contactNo:new FormControl(this.employeeObj.contactNo),
     emailid:new FormControl(this.employeeObj.emailid),
    })
  
  }
    onSave(){
      const oldData=localStorage.getItem("EmpData");
      if(oldData !=null) {
        const parseData = JSON.parse(oldData);
        this.employeeForm.controls['empid'].setValue(parseData.lenght +1)
        this.employeeList.unshift(this.employeeForm.value)
      }
      else{
    
        this.employeeForm.controls['empid'].setValue(1);
                this.employeeList.unshift(this.employeeForm.value)

      }
      localStorage.setItem("EmpData",JSON.stringify(this.employeeList))
       this.employeeObj=new EmployeeModel();
        this.createFrom();
    }
    OnEdit(item:EmployeeModel){
      debugger
      this.employeeObj=item;
      this.createFrom();
    }
    onUpdate(){
      debugger
      const record= this.employeeList.find(m=>m.empid==this.employeeForm.controls['empid'].value);
      if(record!=undefined){
        record.emailid=this.employeeForm.controls['emailid'].value
        record.address=this.employeeForm.controls['address'].value
        record.name=this.employeeForm.controls['name'].value
        record.contactNo=this.employeeForm.controls['contactNo'].value
        record.pincode=this.employeeForm.controls['pincode'].value
        record.city=this.employeeForm.controls['city'].value
        record.state=this.employeeForm.controls['contactNo'].value
      }
       localStorage.setItem("EmpData",JSON.stringify(this.employeeList))
       this.employeeObj=new EmployeeModel();
        this.createFrom();
    }
    OnDelete(empid:number){
    const Isdelete= confirm("are you sure want to delete ?");
     if(Isdelete){
      debugger
       const index = this.employeeList.findIndex(m=>m.empid=empid);
      this.employeeList.splice(index,1);
     localStorage.setItem("EmpData",JSON.stringify(this.employeeList))

    }
    }
    onReset(){
      this.employeeObj=new EmployeeModel();
        this.createFrom();
        localStorage.removeItem("EmpData");
        this.employeeList = [];
    }
}
