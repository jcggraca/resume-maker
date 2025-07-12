import type { FC } from 'react'
import type { Project } from '../../utils/types'
import messages from '../../i18n/messages'
import { useFormatMessage } from '../../i18n/useFormatMessage'
import { useProjectActions } from '../../store/projectStore'
import Input from '../ui/Input/Input'

const ProjectCard: FC<{ project: Project }> = ({ project }) => {
  const t = useFormatMessage()
  const action = useProjectActions()

  return (
    <div className="formGrid">
      <Input
        label={t(messages.name)}
        name={`project-name-${project.id}`}
        placeholder={t(messages.name)}
        value={project.name}
        onChange={e => action.updateProject({ id: project.id, name: e.target.value })}
      />
      <Input
        label={t(messages.link)}
        name={`project-link-${project.id}`}
        placeholder="https://github.com/jcggraca/resume-maker"
        value={project.link}
        onChange={e => action.updateProject({ id: project.id, link: e.target.value })}
      />
    </div>
  )
}

export default ProjectCard
