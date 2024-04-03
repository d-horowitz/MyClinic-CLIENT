type calendarDay = {
    date: string | undefined,
    dayOfWeek: number,
    items: calendarDayItem[]
}
type calendarDayItem = {
    id: number,
    tooltip: string,
    text: string,
    begin: string,
    end: string,
    disabled: boolean
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
type appointment = {
    begin: string,
    createdDate: string,
    description: string,
    end: string,
    id: number,
    patientId: number,
    patientName: string,
    subject: string,
    workDayId: number,
    doctor: string,
    specialization: string
}

type workDay = {
    appointments: appointment[],
    begin: string,
    date: string,
    doctorId: number,
    end: string,
    id: number
}

type appointmentsDay = {
    date: string,
    dayOfWeek: number,
    appointments: appointment[]
}

function getWeeklySchedule(doctor: doctor): calendarDay[] {
    return doctor.workWeekDays.map(
        wwd => {
            const cd: calendarDay = {
                date: undefined,
                dayOfWeek: wwd.dayOfWeek,
                items: [
                    { id: 1, tooltip: '', text: '', begin: wwd.begin, end: wwd.end, disabled: false }
                ]
            };
            return cd;
        }
    )
}
function setToSunday(param: Date): Date {
    const temp = new Date(param);
    while (temp.getDay() != 0) {
        temp.setDate(temp.getDate() - 1);
    };
    return temp;
}
export {
    calendarDay, calendarDayItem, workWeekDay, doctor, getWeeklySchedule, workDay, setToSunday, appointmentsDay
}