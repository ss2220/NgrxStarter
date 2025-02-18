import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { MatSort } from '@angular/material/sort';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  userData?: User[] = [];
  dataSource!: MatTableDataSource<FormGroup>;
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'action'];
  userForm!: FormGroup;
  isEditableNew: boolean = true;
  filterValue: string = '';
  filteredUsers: User[] = [];
  constructor(private userService: UserService, private fb: FormBuilder, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userService.toFetchUser().subscribe((x) => {
      this.userData = x;
      this.filteredUsers = [...this.userData] || [];
      this.loadUsers(this.userData);

    });

    this.userForm = this.fb.group({
      users: this.fb.array([]),
    });

  }

  get users(): FormArray {
    return this.userForm.get('users') as FormArray;
  }

  getFormControl(i: number, field: string): FormControl {
    return this.users.at(i).get(field) as FormControl;
  }

  loadUsers(users: User[]) {
    this.users.clear();
    users.forEach((user) => {
      this.users.push(
        this.fb.group({
          id: [user.id],
          name: [user.name],
          username: [user.username],
          email: [user.email],
          isEditable: [false],
        })
      );
    });

    this.dataSource = new MatTableDataSource(this.users.controls as FormGroup[]);

  }

  applyFilter(): void {
    const normalizedFilter = this.filterValue.trim().toLowerCase();
  
    const filteredUsers = this.userData!.filter(user => {
      const searchText = `${user.id} ${user.name} ${user.username} ${user.email}`.toLowerCase();
      return searchText.includes(normalizedFilter);
    });
  
    this.loadUsers(filteredUsers);
  }


  editRow(index: number) {
    this.users.at(index).get('isEditable')?.setValue(true);
  }

  saveRow(index: number) {
    this.users.at(index).get('isEditable')?.setValue(false);
    this.userService.toUpdateUser(this.users.value[index].id, this.users.value[index]).subscribe(x => {
      this._snackBar.open('Data Updated Successfully', 'Dismiss');
    });

  }

  cancelEdit(index: number) {
    this.users.at(index).get('isEditable')?.setValue(false);
    const originalUser = this.userData![index];
    this.users.at(index).patchValue({
      name: originalUser.name,
      username: originalUser.username,
      email: originalUser.email,
      isEditable: false,
    });

  }
}
