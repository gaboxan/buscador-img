import { Formik, Form, Field } from "formik";
import { useState } from "react";

import './header.css'
import './content.css'
import './article.css'

const App = () =>{
  const [photos, setPhotos] = useState([])
  const open = url => window.open(url)
  return(
    <div>
      <header>
        <Formik initialValues={{search: ''}}
          onSubmit={async values =>{
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, {
              headers:{
                'Authorization': 'Client-ID gsjJkPC3HZ34dlzKJjkN3_wlpFY2mKE4YpxAuuGO-nU'
              }
            });
            
            const data = await response.json();
            setPhotos(data.results)
          }}>
            <Form>
              <Field name="search">

              </Field>
            </Form>
        </Formik>
      </header>
      <div className="containeer">
        <div className="center">
          {photos.map( photo => 
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img  src={[photo.urls.regular, photo.alt_description].join(' - ')}></img>
              <p>{photo.description}</p>
            </article>)}
        </div>
      </div>
    </div>
  )
}

export default App;
