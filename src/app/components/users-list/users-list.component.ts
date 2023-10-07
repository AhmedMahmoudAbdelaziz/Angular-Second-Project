import { Component, OnInit, Input} from '@angular/core';
import { User } from 'src/User';
import { UserService } from 'src/app/services/user.service';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {

  formValue !: FormGroup

  users: User[] = []
  userobject: User = new User()

  dtoptions: DataTables.Settings = {};
  dtTrigger:Subject<any>=new Subject<any>();

  constructor(private userservice: UserService, private formbuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group ({
      username: [''],
      email: [''],
      phonenumber: ['']
    })
    this.dtoptions = {
      pageLength: 7,
      pagingType: 'simple_numbers',
      lengthMenu:[5,10,15,20],
      processing: true,
  }
  this.getuser()
  }

  getuser(){
   this.userservice.GetUsers().subscribe((res) => {
    this.users = res
    this.dtTrigger.next(null)
  })
}

  DeleteUser(user: User) {
    this.userservice.DeleteUser(user).subscribe(() => (this.users = this.users.filter((u) => u.id !== user.id)))
    alert("The User deleted Successfully")
}

adduser(){
  this.userobject.username = this.formValue.value.username
  this.userobject.email = this.formValue.value.email
  this.userobject.phonenumber = this.formValue.value.phonenumber
  
  this.userservice.AddUser(this.userobject).subscribe(res => {
     console.log(res)
     alert("User Added Successfully")
     let ref = document.getElementById('cancel')
     ref?.click()
     this.formValue.reset()
  },
  err => {
    alert("Something Went Wrong")
  })
}

  EditUser(user: User) {
    this.userobject.id = user.id
    this.formValue.controls['username'].setValue(user.username)
    this.formValue.controls['email'].setValue(user.email)
    this.formValue.controls['phonenumber'].setValue(user.phonenumber)
}

updateuser(){
  this.userobject.username = this.formValue.value.username
  this.userobject.email = this.formValue.value.email
  this.userobject.phonenumber = this.formValue.value.phonenumber
  this.userservice.UpdateUser(this.userobject, this.userobject.id).subscribe(res => {
    console.log(res);
    alert("Updated Successfully")
    let ref = document.getElementById('cancel')
    ref?.click()
    this.formValue.reset()
  })
}

}