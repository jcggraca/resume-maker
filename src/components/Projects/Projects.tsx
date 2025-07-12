import messages from '../../i18n/messages'
import { useFormatMessage } from '../../i18n/useFormatMessage'
import { useProjectActions, useProjects } from '../../store/projectStore'
import OrderButtons from '../OrderButtons/OrderButtons'
import AddButton from '../ui/AddButton/AddButton'
import DeleteButton from '../ui/DeleteButton/DeleteButton'
import TextArea from '../ui/TextArea/TextArea'
import ProjectCard from './ProjectCard'

export default function Projects() {
  const t = useFormatMessage()

  const projects = useProjects()
  const { addProject, updateProject, removeProject } = useProjectActions()

  return (
    <section id="projects" className="section">
      <h2>{t(messages.projects)}</h2>

      {projects
        .sort((a, b) => a.order - b.order)
        .map(project => (
          <div className="card" key={project.id}>
            <ProjectCard project={project} />

            <TextArea
              label={t(messages.description)}
              name={`project-description-${project.id}`}
              placeholder={t(messages.description)}
              value={project.description}
              onChange={e => updateProject({ id: project.id, description: e.target.value })}
              rows={5}
            />

            <div className="flexBetween">
              <OrderButtons
                item={project}
                list={projects}
                onClick={updateProject}
              />

              <DeleteButton textId="project" onClick={() => removeProject(project.id)} />
            </div>
          </div>
        ))}

      <AddButton textId="project" onClick={addProject} />
    </section>
  )
}
