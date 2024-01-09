type calendarDay = {
    dayOfWeek: number,
    items: calendarDayItem[]
}
type calendarDayItem = {
    text: string,
    begin: string,
    end: string
}
type workWeekDay = {
    dayOfWeek: number,
    begin: string,
    end: string
}

type doctor = {
    id: number,
    name: string,
    specialization: string,
    workWeekDays: workWeekDay[]
}
function getWeeklySchedule(doctor: doctor): calendarDay[] {
    return doctor.workWeekDays.map(
        wwd => {
            const cd: calendarDay = {
                dayOfWeek: wwd.dayOfWeek,
                items: [
                    {text:'', begin: wwd.begin, end: wwd.end }
                ]
            };
            return cd;
        }
    )
}
export {
    calendarDay, calendarDayItem, workWeekDay, doctor, getWeeklySchedule
}