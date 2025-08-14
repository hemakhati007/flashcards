


import '../App.css'
const Profile = () => {
    return (
        <div className="row border w-100  p-3 m-0 align-items-center ">
            {/* Profile Image */}
            <div className="text-center  m-1 mb-lg-0 flex-lg-nowrap flex-wrap border">
                
                    <div className="profile-photo col-6 col-md-12 text-center border">
                        <img className="border" style={{
                            height: "5rem",
                            width: "5rem",        // equal width for a square
                            borderRadius: "50%",  // makes it a circle
                            objectFit: "cover"    // keeps image ratio without stretching
                        }} src="/Fake.jpeg" alt="user-profile"/>
                    </div>
                    <div className="col-6 col-md-12  border">
                        <h6>lmao</h6>
                        <h6 className="text-muted handle">@lmao</h6>
                        <button
                            type="button"
                            className="btn btn-primary "
                           
                        > update profile</button>
                    </div>

               
            </div>
        </div>

    )
};
export default Profile;