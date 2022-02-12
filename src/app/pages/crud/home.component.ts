import { Component, OnInit } from '@angular/core';
import { VideoGamesService } from 'src/app/services/video-games.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Maintenance } from 'src/app/models/maintenance';
import { Salary } from 'src/app/models/salary';
import { Bank } from 'src/app/models/bank';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  id: string | null;

  workerForm: FormGroup;
  salaryForm: FormGroup;
  bankForm: FormGroup;
  constructor(private VideoGamesService:VideoGamesService, private fb: FormBuilder, private router: Router,  private idRoute: ActivatedRoute) { 
    this.workerForm = this.fb.group({
			nameworker: ['', Validators.required],
			lastnameworker: ['', Validators.required],
		});
    this.salaryForm = this.fb.group({
			positionworker: ['', Validators.required],
			salaryworker: ['', Validators.required],
		});
    this.bankForm = this.fb.group({
			bankworker: ['', Validators.required],
			accountworker: ['', Validators.required],
		});
    this.id  = this.idRoute.snapshot.paramMap.get("id");
  }
  
  ngOnInit(): void {
    this.updateForm();
    this.getMaintenances();
  }
  
  //--------------------Fetch data from DB--------------------//
  listMainteance: any= [];
  getMaintenances(){    
    this.VideoGamesService.getMaintenances().subscribe((MaintenanceDB) => {  
      this.listMainteance = MaintenanceDB;
      console.log(MaintenanceDB);
    }, error =>{
      console.log(error);
    })
  }
  //-alary a data in the DB
	valorNumerico = /^[0-9]+$/;
	modal_title = 'Create Worker';
  bankArray:any = [];
  saveBank(){
    let BANK: Bank = {
      bank: this.bankForm.get('bankworker')?.value,
      account: this.bankForm.get('accountworker')?.value,
    }
    this.bankArray.push(BANK)
    this.bankForm.reset();
  }
  postMaintenance(){
    const SALARY: Salary = {
      salary: this.salaryForm.get('salaryworker')?.value,
      position: this.salaryForm.get('positionworker')?.value,
      bankaccount: this.bankArray
    }
    const MAINTENANCE: Maintenance = {
			name: this.workerForm.get('nameworker')?.value,
			lastname: this.workerForm.get('lastnameworker')?.value,
      salary: [SALARY],
		}    
		if(this.id == null){
			this.VideoGamesService.postMaintenance(MAINTENANCE).subscribe( data => {
				this.router.navigate(['/admin'])
				Swal.fire({
					icon: 'success',
					title: 'Worker added',
					text: 'The worker is now registerd on the database'
				})
			})
		}else{
			this.VideoGamesService.putMaintenance(this.id, MAINTENANCE).subscribe( data => {
				this.router.navigate(['/admin'])
				Swal.fire({
					icon: 'success',
					title: 'CRUD information updated',
					text: 'The database was updated'
				})
			})
		}
    setTimeout(() => {
      this.getMaintenances();
      this.workerForm.reset();
      this.salaryForm.reset();
      this.bankForm.reset();
      this.bankArray = [];

    }, 2000);

  }
  updateForm(){
    this.id = this.idRoute.snapshot.paramMap.get("id");
    setTimeout(() => {
    if(this.id !== null){
      this.modal_title = "Update CRUD";
      this.VideoGamesService.getMaintenance(this.id).subscribe(data =>{
        this.workerForm.setValue({
          nameworker: data.name,
          lastnameworker: data.lastname,
        });
        this.salaryForm.setValue({
          salaryworker: data.salary[0].salary,
          positionworker: data.salary[0].position
        });
        this.bankForm.setValue({
          bankworker: data.salary[0].bankaccount[0].bank,
          accountworker: data.salary[0].bankaccount[0].account
        });
      })
    }
    setTimeout(() => {
      this.getMaintenances();
    }, 1000);
  }, 1000);
	}
  triggerModal(){
    this.updateForm();
    setTimeout(() => {
      this.updateForm();
    }, 200);
    this.getMaintenances();
  }
  //---Delete a worker in the DB
  deleteMaintenance(id: any) {
		Swal.fire({
			title: 'Are you sure yo want to delete it?',
			text: "You can not recover the data afterwards",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then((result: any) => {
			if (result.isConfirmed) {
				this.VideoGamesService.deleteMaintenance(id).subscribe( data => {
					Swal.fire({
						icon: 'success',
  					title: 'Data deleted',
					})
					this.getMaintenances();
				}, error => {
					console.log(error)
				})
			}
		})
	}
}
