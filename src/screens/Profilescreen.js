import { loadStripe } from '@stripe/stripe-js'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { auth, db } from '../firebase'
import Nav from '../Nav'
import './Profilescreen.css'

function Profilescreen() {
  const user = useSelector(selectUser)
  const [products, setProducts] = useState([])
  const [subsciption, setSubscription] = useState(null)

  useEffect(() => {
    db.collection('customers')
      .doc(user.uid)
      .collection('subscriptions')
      .get()
      .then((querrySnapshot) => {
        querrySnapshot.forEach(async (subsciption) => {
          setSubscription({
            role: subsciption.data().role,
            current_period_end: subsciption.data().current_period_end.seconds,
            current_period_start:
              subsciption.data().current_period_start.seconds,
          })
        })
      })
  }, [user.uid])
  console.log(subsciption)

  useEffect(() => {
    db.collection('products')
      .where('active', '==', true)
      .get()
      .then((querrySnapshot) => {
        const products = {}
        querrySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data()
          const priceSnap = await productDoc.ref.collection('prices').get()
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            }
          })
        })
        setProducts(products)
      })
  }, [])
  console.log(products)

  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection('customers')
      .doc(user.uid)
      .collection('checkout_sessions')
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      })

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data()

      if (error) {
        alert(`An error occured: ${error.message} `)
      }

      if (sessionId) {
        const stripe = await loadStripe(
          'pk_test_51L2HVNDuBQRmL8VzklJ9cEjTSuUvQHscH20txo72hutstgNQ0NSLW3l7DnIkZ1uLE4pwpaHzCAR738Ez5k60sHcr00gvMHF4eQ'
        )
        stripe.redirectToCheckout({ sessionId })
      }
    })
  }

  return (
    <div className='profilescreen'>
      <Nav />

      <div className='profilescreen_body'>
        <h1>edit profile</h1>
        <div className='profilescreen_info'>
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
            alt=''
          />
          <div className='profilescreen_details'>
            <h2>{user.email}</h2>
            <div className='profilescreen_plans'>
              <h3>Plans (Current Plan:premium)</h3>
              {subsciption && (
                <p>
                  Reneval Date:
                  {new Date(
                    subsciption?.current_period_end * 1000
                  ).toLocaleDateString()}
                </p>
              )}
              {Object.entries(products).map(([productId, productData]) => {
                const isCurrentPackage = productData.name
                  ?.toLowerCase()
                  .includes(subsciption?.role)

                return (
                  <div
                    key={productId}
                    className={`${
                      isCurrentPackage && 'planscreen_plan--disabled'
                    } planscreen_plan`}
                  >
                    <div className='loginscreen_type'>
                      <div className='loginscreen_typedetails'>
                        <p>
                          <span>{productData.name} </span> <br />
                          {productData.description}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          !isCurrentPackage &&
                          loadCheckout(productData.prices.priceId)
                        }
                        className='profilescreen_signout'
                      >
                        {isCurrentPackage ? 'Current Package' : 'Subscribe'}
                      </button>
                    </div>
                  </div>
                )
              })}
              <button
                onClick={() => auth.signOut()}
                className='profilescreen_signout'
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profilescreen
