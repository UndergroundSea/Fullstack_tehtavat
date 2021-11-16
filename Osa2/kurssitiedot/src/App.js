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

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  const final = []

  for (const course of courses) {
    final.push(<Course key={course.id} course={course} />)
  }

  return (
    <div>
      <h1>Web development curriculum</h1>
      {final}
    </div>
  )
}

export default App