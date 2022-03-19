import React from 'react'
import {Link} from 'react-router-dom'
import { GrChapterAdd } from "react-icons/gr";
import {FaProjectDiagram} from 'react-icons/fa'

function Home() {
  return (
    <>
    <section className="heading"><h1>Project Dashboard</h1>
    <p>Make a selection below</p>
    <Link to='/new-project' className='btn btn-reverse btn-block'>
      <GrChapterAdd /> Create New Project
    </Link>
    <Link to='/projects' className='btn btn-block'>
      <FaProjectDiagram /> View Your Projects
    </Link>
    </section></>
  )
}

export default Home