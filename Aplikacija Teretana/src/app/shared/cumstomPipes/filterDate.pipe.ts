import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name:'filterDate'
})
export class FilterDatePipe implements PipeTransform{

    transform(value: any, filteredUser: any) {
        if(!value || !filteredUser){
            return value
        };
        return value.filter(user => user.date.includes(filteredUser))
    }
}