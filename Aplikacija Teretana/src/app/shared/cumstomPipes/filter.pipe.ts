import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name:'filter'
})
export class FilterPipe implements PipeTransform{

    transform(value: any, filteredUser: any) {
        if(!value || !filteredUser){
            return value
        };
        return value.filter(user => user.name.toLowerCase().includes(filteredUser.toLowerCase()))
    }
}