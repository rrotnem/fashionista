import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users:Array<any>;
  errors:any=[];
  length:number = 0;
  result:string = "";
  hidden:boolean = true;
  type:string = "hidden";
  user:any={
    id:"",
    username:"",
    email:""
  }
  isRegister:boolean = true;

  formData: any = {};
  isUser:boolean = false;
  id:any;


  constructor(private auth:AuthService,private userService: UserService, private router:Router) { }

  ngOnInit(): void {
    this.loadUsersInfo()
    this.id = this.auth.getId();
      console.log("email" + this.id)
    

  }

  loadUsersInfo(){
 
    this.userService.getAllUsers().
    subscribe(data => {
     this.users = data;  
     this.length = this.users.length;
     },
      (errorResponse) => {
        this.errors.push(errorResponse.error.error);
      });

  }

  deleteUser(id){
    
    this.userService.deleteUserById(id).subscribe(data =>{ 
      this.result = data.msg;
      this.loadUsersInfo();    

      this.router.navigate(['/admin/users'], { queryParams: { deleted: 'success' } });
    },
    (errorResponse)=>{
      this.errors.push(errorResponse.error.error);      
    })
   
  }
  userEdit(){
    this.hidden = false;
    this.type="text";

  }

  updateUser(id, username, email){
     console.log(id +" "+ username+" "+email)
     this.user={
       id: id,
       username: username,
       email: email
     }
     this.hidden = true;
     this.type = "hidden";
     this.loadUsersInfo()

    this.userService.updateUser(this.user).subscribe(data =>{ 
      this.result = data.msg;
 
      this.loadUsersInfo();
      this.router.navigate(['/admin/users'], { queryParams: { updated: 'success' } });
    },
    (errorResponse)=>{
      this.errors.push(errorResponse.error.error);      
    })
   
  }
  register(): void {
    this.errors = [];
    this.userService.register(this.formData)
      .subscribe((data) => {
        this.isUser = false;
        this.result="Register Successfully"

        this.loadUsersInfo();
        this.isUser = false;
        this.router.navigate(['/admin/users'], { queryParams: { registered: 'success' } });
       },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error);
        });
  }

  addUser(){
    this.isUser = true;
  }  

  cancelUpdate(){
    this.hidden = true;
    this.type="hidden"
  }
  cancel(){
    this.isUser = false;
  }

  

}
