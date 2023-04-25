'use client'
import React from 'react'
import {Card, Placeholder} from 'react-bootstrap'
export default function LoadingMainForm() {
  return (
    <div className={'contenedor main-form-flex-container'} >
    <Card  className="bg-dark card-img text-white main-image-container">
        <Card.Header className='card-img' variant="top"  />
        <Card.ImgOverlay className={'card-img-overlay'}></Card.ImgOverlay>
        <Card.Body>
          <Placeholder  animation="wave" size='lg' >
            <Placeholder size='lg' bg='dark'  xs={12} /> 
            <Placeholder size='lg' bg='dark'  xs={12} /> 
            <Placeholder size='lg' bg='dark'  xs={12} />
          </Placeholder>
          <Placeholder animation="wave" size='lg' >
            <Placeholder size='lg' bg='dark'  xs={12} /> 
            <Placeholder size='lg' bg='dark'  xs={12} /> 
          </Placeholder>
          <Placeholder.Button  className={'u-full-width capitalize-style find-btn-main-form'} variant="dark" xs={3} size='lg' />
        </Card.Body>
      </Card>

    </div>
  )
}
