import { Calendar, Tooltip } from 'antd'
import dayjs from 'dayjs'
import { useCommunityCollaboration } from '../../../../stores/communityCollaborationStore'

export const CommunityCollaborationCalendar = () => {
  const { turnsAssignedToUser } = useCommunityCollaboration()

  // Renderiza un punto en el calendario solo para los turnos asignados al usuario
  const dateCellRender = (value) => {
    const listData = Array.isArray(turnsAssignedToUser)
      ? turnsAssignedToUser.filter(
          item => dayjs(item.dateAssigned).isSame(value, 'day')
        )
      : []
    return (
      <ul className="m-0 p-0 list-none">
        {listData.map((item, idx) => (
          <li key={item._id || idx} className="inline-block mr-1">
            <Tooltip title={`${item.activityId?.activityName || 'Colaboración'} (${item.startTime} - ${item.endTime})`}>
              <span className="w-3 h-3 bg-green-500 rounded-full inline-block cursor-pointer"></span>
            </Tooltip>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="p-4 bg-white rounded  w-full max-w-md mx-auto sm:max-w-lg md:max-w-xl lg:max-w-2xl overflow-x-auto">
      <Calendar cellRender={dateCellRender} fullscreen={false} className="w-full min-w-[320px]" />
      {/* Lista de actividades asignadas debajo del calendario */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4 text-[#338826]">Tus actividades asignadas</h2>
        {Array.isArray(turnsAssignedToUser) && turnsAssignedToUser.length > 0 ? (
          <div className="flex flex-col gap-4">
            {turnsAssignedToUser.map((turno, idx) => (
              <div
                key={turno._id || idx}
                className="flex items-center gap-4 bg-gradient-to-r from-green-50 via-white to-green-100 rounded-2xl shadow p-4"
              >
                {/* Imagen o icono de la actividad */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-200 flex items-center justify-center">
                  <span className="text-2xl">🌱</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800 text-lg">
                    {turno.activityId?.activityName || 'Colaboración'}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {dayjs(turno.startTime, 'HH:mm:ss').format('hh:mm a')} - {dayjs(turno.endTime, 'HH:mm:ss').format('hh:mm a')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No tienes actividades asignadas.</p>
        )}
      </div>
    </div>
  )
}