/* eslint-disable camelcase */
import React, { useContext, useState, useEffect } from 'react'
// import { useHistory } from 'react-router-dom'
import API from 'config/api'
import { Loader } from 'components'
import { userMeData } from 'mockup'
import { REACT_APP_AVOID_ME_REQUEST } from '../env'
import { auth, firestore } from 'config/Firebase'


const AuthContext = React.createContext()

export const AuthProvider = ({ children }) =>{
  const [user, setUser] = useState(null)
  const [restaurant, setRestaurant] = useState(null)
  const [branches, setBranches] = useState(null)
  const [loading, setLoading] = useState(true)
  // const history = useHistory()
  const [fields, setFields] = useState({
    name: { value: ``, error: false },
    password: { value: ``, error: false },
  })

  const onChangeFields = ({ name, value }) => {
    setFields({
      ...fields,
      [name]: { error: ``, value },
    })
  }

  useEffect(() => {
    const getMe = async () => {
      try {
        setLoading(true)
        let nextUser = REACT_APP_AVOID_ME_REQUEST === `true`
          ? userMeData
          : localStorage.getItem(`auth_guimy`)
            ? JSON.parse(localStorage.getItem(`auth_guimy`))
            : await API.me(null)// TODO: implementar verificación de token activo
        setUser(nextUser)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }

    getMe()
  }, [])



  function logInHandel() {
    setLoading(true);
    auth().signInWithEmailAndPassword(fields.name.value, fields.password.value).then((user)=>{
      // Traemos los datos del usuario
      firestore.collection('users').doc(user.user.uid).onSnapshot((data)=>{
        // a la par traemos los datos de su restaurante
        firestore.collection('restaurant').doc(data.data().ownerRest).onSnapshot((date)=>{
          
          
          date.data().branches.map((e)=>{
            console.log(e)
            firestore.collection('branchofice').where('uid','==',e).onSnapshot((branch)=>{
              setUser(data.data());
              setRestaurant(date.data())
              setLoading(false);
              setBranches(branch.docs)
              console.log(branch.docs)
            })
          })
          // Una vez tenemos los datos del restaurante traemos los datos de sus sucursales

        })
      })

    })
    .catch((e)=>{
      setLoading(false);
      alert('Contraseña o correo incorrecto')
    })

  }

  return (
    <AuthContext.Provider value={{ user, logInHandel, fields, onChangeFields, restaurant, branches }}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }

  return context
}

export { AuthContext, useAuth }
