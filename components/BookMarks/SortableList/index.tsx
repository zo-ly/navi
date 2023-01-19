import { FC, useCallback } from 'react'
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragEndEvent,
  closestCenter,
} from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import BookMark from '../BookMark'
import { IBookMark } from '../interface'

interface ISortable {
  bookMarks: Array<IBookMark>
  onSetting: (id: string) => () => void
  onDragEnd: (bm: Array<IBookMark>) => void
}

const SortableList: FC<ISortable> = ({ bookMarks, onDragEnd, onSetting }) => {
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (active.id === over?.id) return

      const oldIndex = bookMarks.findIndex(({ id }) => id === active.id)
      const newIndex = bookMarks.findIndex(({ id }) => id === over?.id)
      const newBookMarks = arrayMove(bookMarks, oldIndex, newIndex)
      onDragEnd(newBookMarks)
    },
    [bookMarks, onDragEnd]
  )
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={bookMarks}>
        {bookMarks.map(({ id, name, link }) => {
          return (
            <BookMark
              id={id}
              key={id}
              name={name}
              link={link}
              onSetting={onSetting(id)}
            />
          )
        })}
      </SortableContext>
    </DndContext>
  )
}

export default SortableList
