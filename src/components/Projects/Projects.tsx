import { useIntl } from 'react-intl'
import { useResumeStore } from '../../store/useResumeStore'
import OrderButtons from '../OrderButtons/OrderButtons'
import AddButton from '../ui/AddButton/AddButton'
import DeleteButton from '../ui/DeleteButton/DeleteButton'
import Input from '../ui/Input/Input'
import TextArea from '../ui/TextArea/TextArea'

export default function Projects() {
  const intl = useIntl()
  const { projects, addProject, updateProject, removeProject } = useResumeStore()

  return (
    <section id="projects" className="section">
      <h2>{intl.formatMessage({ id: 'projects' })}</h2>

      {projects
        .sort((a, b) => a.order - b.order)
        .map(project => (
          <div className="card" key={project.id}>
            <div className="formGrid">
              <Input
                label={intl.formatMessage({ id: 'name' })}
                name={`project-name-${project.id}`}
                placeholder={intl.formatMessage({ id: 'name' })}
                value={project.name}
                onChange={e => updateProject({ id: project.id, name: e.target.value })}
              />
              <Input
                label={intl.formatMessage({ id: 'link' })}
                name={`project-link-${project.id}`}
                placeholder="https://github.com/jcggraca/resume-maker"
                value={project.link}
                onChange={e => updateProject({ id: project.id, link: e.target.value })}
              />
            </div>

            <TextArea
              label={intl.formatMessage({ id: 'description' })}
              name={`project-description-${project.id}`}
              placeholder={intl.formatMessage({ id: 'description' })}
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
