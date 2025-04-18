// JobMapView.js
import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Job data
const jobData = [
  {
    "title": "Java Developer",
    "company": "Calif Technologies Private Limited",
    "location": "Mumbai/Bombay",
    "salary": "₹125,000 - ₹130,000 monthly",
    "urgentlyHiring": false,
    "tags": [
      "Work from Office",
      "Full Time",
      "Min. 5 years",
      "Good (Intermediate / Advanced) English"
    ],
    "logo": "https://apna-organization-logos.gumlet.io/production/logos/bc7a67de-c3eb-4774-86fc-aa19fc427d9f/6501835a4973013107bd2dba.jpeg?w=128",
    "coordinates": { "lat": 19.054999, "lng": 72.8692035 }
  },
  {
    "title": "Java Developer",
    "company": "Quantum Soft IT Services",
    "location": "Pune",
    "salary": "₹32,500 - ₹62,200 monthly",
    "urgentlyHiring": false,
    "tags": [
      "Work from Office",
      "Full Time",
      "Any experience",
      "Good (Intermediate / Advanced) English"
    ],
    "logo": "",
    "coordinates": { "lat": 18.5213738, "lng": 73.8545071 }
  },
  {
    "title": "Java Developer",
    "company": "Krishna Computer Sales Service",
    "location": "Wagholi, Pune",
    "salary": "₹33,000 - ₹38,000 monthly",
    "urgentlyHiring": false,
    "tags": [
      "Work from Office",
      "Full Time",
      "Any experience",
      "Basic English"
    ],
    "logo": "",
    "coordinates": { "lat": 18.5806299, "lng": 73.9833099 }
  },
  {
    "title": "Java IT Trainer",
    "company": "Pumo Technovation India Private Limited",
    "location": "Kadubeesanahalli, Bengaluru/Bangalore",
    "salary": "₹15,000 - ₹40,000 monthly*",
    "urgentlyHiring": true,
    "tags": [
      "Work from Office",
      "Full Time",
      "Any experience",
      "Good (Intermediate / Advanced) English"
    ],
    "logo": "",
    "coordinates": { "lat": 12.9421555, "lng": 77.6973034 }
  },
  {
    "title": "Sr. Java Backend Lead",
    "company": "360 Degree Cloud Technologies Private Limited",
    "location": "New Delhi",
    "salary": "₹100,000 - ₹149,999 monthly",
    "urgentlyHiring": true,
    "tags": [
      "Work from Office",
      "Full Time",
      "Min. 10 years",
      "Good (Intermediate / Advanced) English"
    ],
    "logo": "",
    "coordinates": { "lat": 28.6430858, "lng": 77.2192671 }
  }
];

const JobMapView = () => {
  return (
    <div className="mt-20" style={{ height: "600px", width: "100%" }}>
      <MapContainer
        center={[22.9734, 78.6569]} // Center of India
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {jobData.map((job, index) => (
          <Marker key={index} position={[job.coordinates.lat, job.coordinates.lng]}>
            <Popup>
              <div style={{ minWidth: "200px" }}>
                <h3>{job.title}</h3>
                <p><strong>🏢 {job.company}</strong></p>
                <p>📍 {job.location}</p>
                <p>💰 {job.salary}</p>
                <p><strong>Tags:</strong></p>
                <ul style={{ paddingLeft: "20px" }}>
                  {job.tags.map((tag, i) => (
                    <li key={i}>{tag}</li>
                  ))}
                </ul>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default JobMapView;
