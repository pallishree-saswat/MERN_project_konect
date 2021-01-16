import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { getProfiles} from '../../redux/actions/profile'
import ProfileItem from './ProfileItem'

const Profiles = ({ profile:{profiles, loading}, getProfiles }) => {

    useEffect(() => {
        getProfiles()
    }, [])
    
    return (
        <Fragment>
        {loading ? (
         <h1>Loading....</h1>
        ) : (
          <Fragment>
            <h1 className='large text-primary'>People</h1>
         
            <div className='profile'>
              {profiles.length > 0 ? (
                profiles.map(profile => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
              ) : (
                <h4>No profiles found...</h4>
              )}
           
            </div>
          </Fragment>
        )}
      </Fragment>
    )
}

const mapStateToProps = state =>({
  profile : state.profile
})

export default connect(mapStateToProps,{getProfiles})(Profiles)