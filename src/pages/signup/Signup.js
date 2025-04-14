import { useState } from 'react'
import { Link } from 'react-router-dom'

// styles
import './Signup.css'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)


  const handleFileChange = (e) => {
    setThumbnail(null)
    const file = e.target.files[0]
    if (!file) {
      setThumbnailError('Please select a file')
      return
    }else if (file.size > 1024 * 1024) {
      setThumbnailError('File size should be less than 1MB')
      return
    }else if (!file.type.includes('image')) {
      setThumbnailError('Selected file must be an image')
      return
    }
    setThumbnailError(null)
    setThumbnail(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log(email, password, confirmPassword, displayName, thumbnail)
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Sign up</h2>
      <label>
        <span>Email:</span>
        <input
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>

      <label>
        <span>Password:</span>
        <input
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>

      <label>
        <span>Confirm Password:</span>
        <input
          type="password"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
      </label>

      <label>
        <span>Display Name:</span>
        <input
          type="text"
          required
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>

      <label>
        <span>Profile Thumbnail:</span>
        <input
          type="file"
          required
          onChange={handleFileChange}
        />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>

      <button className="btn">Sign up</button>
      <p>Already have an account? <Link to="/login">Log in</Link></p>
    </form>
  )
}