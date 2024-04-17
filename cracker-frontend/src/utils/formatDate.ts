export function formatDate(date: string | undefined){
    if(date == undefined)return ""

    const splitted=date.split("-")

    return `${splitted[2]}.${splitted[1]}.${splitted[0]}`
}