import './components/header/userSearch.js'
import './components/header/perPageField.js'
import './components/main/searchUserRepos.js'

// Check if Accelerometer is supported
if ('Accelerometer' in window) {
    // Request permission to access sensors
    navigator.permissions.query({ name: 'accelerometer' })
      .then(permissionStatus => {
        if (permissionStatus.state === 'granted') {
          // Accelerometer permission granted
  
          // Create an instance of the Accelerometer sensor
          const accelerometer = new Accelerometer({ frequency: 60 }); // Set desired update frequency
  
          // Define an event listener for sensor updates
          accelerometer.addEventListener('reading', () => {
            // Access acceleration data from the sensor
            const acceleration = accelerometer.reading;
  
            // Log acceleration values
            console.log("Acceleration along x-axis: " + acceleration.x);
            console.log("Acceleration along y-axis: " + acceleration.y);
            console.log("Acceleration along z-axis: " + acceleration.z);
          });
  
          // Start the sensor
          accelerometer.start();
        } else {
          console.log('Permission to access accelerometer is denied.');
        }
      })
      .catch(error => {
        console.error('Error while requesting accelerometer permission:', error);
      });
  } else {
    console.log('Accelerometer not supported on this device.');
  }
  