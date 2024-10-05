import React from 'react'

function Features() {
  return (
    <>
    <div className='features-section px-20 pt-20'>
      <h1>Product Features</h1>
      <p>Organize smarter, prioritize effortlessly, and achieve more with intelligent features that understand your workflow. Elevate your productivity today!</p>
    </div>
    <div className='px-20 pt-20'>
        <div className='features-card'>
            <h1 className='card-title'>Note Suggestions</h1>
            <p className='card-description'>The app automatically detects the context of your tasks and notes based on content and time. </p>
        </div>
        
        <div className='features-card'>
            <h1 className='card-title'>AI Powered Task Prioritization</h1>
            <p className='card-description'>Users input their tasks, and the AI automatically prioritizes them based on deadlines, urgency, and user habits. </p>
        </div>

        <div className='features-card'>
            <h1 className='card-title'>Task & Note Integration With Calendar & Location</h1>
            <p className='card-description'>Tasks and notes are synced with the user's calendar, and location-based reminders can be set.</p>
        </div>

        <div className='features-card'>
            <h1 className='card-title'>Voice Driven Note Taking With Summarization</h1>
            <p className='card-description'>Integrate speech-to-text functionality for note-taking on the go. Afterward, an AI summarizer can convert long-form notes into brief task lists or summaries.</p>
        </div>

        <div className='features-card'>
            <h1 className='card-title'>Task Dependency Management</h1>
            <p className='card-description'>The app allows users to create dependencies between tasks (i.e., Task B cannot start until Task A is completed). This ensures that users follow a logical flow in their task execution.</p>
        </div>
    </div>
    </>
  )
}

export default Features
