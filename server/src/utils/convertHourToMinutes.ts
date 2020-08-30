export default function convertHourToMinutes(time: string)
{

    // 8:00 

    // separa os valores separados por ':' e retorna o number
    // 8
    // 0
    
    const [hour, minutes] = time.split(":").map(Number);

    const timeInMinutes = (hour * 60) + minutes;

    return timeInMinutes;

}