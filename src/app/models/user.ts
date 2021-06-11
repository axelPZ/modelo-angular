
export class User {

  constructor(
    public id: string,
    public name: string,
    public surname: string,
    public email: string,
    public password: string,
    public img: string,
    public role: string,
    public estado: boolean,
    public google: boolean
  ){}

}
