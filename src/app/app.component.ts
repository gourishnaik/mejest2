import { Component,OnInit } from '@angular/core';
import { FormGroup, Validators, NgForm, FormControl, FormBuilder } from '@angular/forms';
import { ApiService } from './api.service';
import { majesticmodel } from './majesticmodel';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  majesticmodelObj: majesticmodel = new majesticmodel();
  public mejy: majesticmodel = {} as majesticmodel;
  mejesticform!: FormGroup;
  mejval:any;
  alluser:any;
  user:any;
  isEdit = false;
  title = 'majestic';
  constructor(private formbuilder: FormBuilder,private api :ApiService) { }
  ngOnInit(): void {
    this.getLatestUser();
    this.mejesticform = this.formbuilder.group({
      name: ['', Validators.required],
      printname: ['', Validators.required],
      selecttype: ['', Validators.required],
      codetype: ['', Validators.required],
      code: ['', Validators.required],
      weekprice: ['', Validators.required],
      weekendprice: ['', Validators.required],
    })
  }

  add(){
    
   // console.log(this.mejesticform.value)

    this.majesticmodelObj.name = this.mejesticform.value.name;
    this.majesticmodelObj.code = this.mejesticform.value.code;
    this.majesticmodelObj.codetype = this.mejesticform.value.codetype;
    this.majesticmodelObj.selecttype = this.mejesticform.value.selecttype;
    this.majesticmodelObj.printname = this.mejesticform.value.printname;
    this.majesticmodelObj.weekprice = this.mejesticform.value.weekprice;
    this.majesticmodelObj.weekendprice = this.mejesticform.value.weekendprice;

    this.api.createuser(this.majesticmodelObj).subscribe((res) => {
    //  alert("added successfully!!!");
    this.mejval = res;
     // console.log("response is",res);
       this.mejesticform.reset()
       this.getLatestUser();
    })
  }

  getLatestUser() {
    this.api.getAlluser()
      .subscribe(data => {
        console.log(data);
       this.alluser = data;
    //    console.log(this.alluser);
      })
  }

  

deleteuser(mydata: any) {
 /// if (confirm('Are you sure to delete?'))
    this.api.delete(mydata).subscribe(() => {
      this.getLatestUser();
    })
}

edituser(mydata: any) {
 this.isEdit = true;
  // this.empy= user;
  this.mejy = mydata;
   this.mejesticform.controls['name'].setValue(mydata.name)
   this.mejesticform.controls['mobile'].setValue(mydata.code)
   this.mejesticform.controls['codetype'].setValue(mydata.codetype)
   this.mejesticform.controls['selecttype'].setValue(mydata.selecttype)
   this.mejesticform.controls['printname'].setValue(mydata.printname)
   this.mejesticform.controls['weekprice'].setValue(mydata.weekprice)
   this.mejesticform.controls['weekendprice'].setValue(mydata.weekendprice)
  
  }


  updateuser() {
    this.isEdit = false;
    this.api.updateuser(this.mejy).subscribe(() => {
      this.mejesticform.reset();
      this.getLatestUser();
     // alert("updated sucessfully!!!")
      //this.isEdit = !this.isEdit;
    })
  }
}