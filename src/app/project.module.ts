

const TODAY_STR = new Date().toISOString().replace(/T.*$/, '');
export class ProjectModel{
    id : number =0;
    title : string ='';
    author :string ='';
    description :string ='';
    category :string ='';
    start :Date=new Date();
    end :Date=new Date();
    contributers : number = 0;
    rating : number = 0;
  
  
  }