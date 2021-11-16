import React from 'react'

const Course = ({course}) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} /> 
      </div>    
    )
  }
  
  const Header = (props) => {
    return (
      <div>
        <h2>
          {props.course}
        </h2>
      </div>
    )
  }
  
  const Content = (props) => {
    return (
      <div>
        {props.parts.map((part, i) =>
          <Part key={part.id} part={props.parts[i].name} exercises={props.parts[i].exercises} />
        )}  
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <div>
        <p>
          {props.part} {props.exercises}
        </p>
      </div>
    )
  }
  
  const Total = ({parts}) => {
    const total = parts.reduce((previous, current) => 
      
      previous + current.exercises, 0
    )
    
    return (    
      <div>      
        <h4>     
          Number of exercises {total}
        </h4>
      </div>
    )
  }

export default Course