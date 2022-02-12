export class Maintenance{
    _id?: string;
    name: String;
    lastname: String;
    salary: any
    constructor(
        name: String,
        lastname: String, salary: any){
            this.name = name;
            this.salary = salary;
            this.lastname = lastname;}
}