import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
import "leaflet-fullscreen";
import { FaExternalLinkAlt } from "react-icons/fa";

// Fix Leaflet icon path
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Fullscreen control
const FullscreenControl = () => {
    const map = useMap();
    useEffect(() => {
        const fullscreenControl = L.control.fullscreen({ position: "topright" });
        fullscreenControl.addTo(map);
        return () => fullscreenControl.remove();
    }, [map]);
    return null;
};

const JobMapView = () => {
    const { register, handleSubmit } = useForm();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const onSubmit = async ({ category, state }) => {
        setLoading(true);
        setError("");
        try {
            const res = await axios.get("http://localhost:8000/api/jobb", {
                params: {
                    what: category || "Web Developer",
                    where: state || "Maharashtra",
                },
            });
            setJobs(res.data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch jobs. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen px-4 py-8 space-y-6 flex flex-col items-center">
            {/* Form */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-wrap gap-4 items-center justify-center sticky top-0 bg-white z-10 py-4 rounded-md shadow-sm w-full max-w-4xl"
            >
                <input
                    {...register("category")}
                    placeholder="Job Title (e.g., React Developer)"
                    className="p-2 border rounded-md w-64"
                />
                <input
                    {...register("state")}
                    placeholder="Location (e.g., Pune)"
                    className="p-2 border rounded-md w-64"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                    {loading ? "Searching..." : "Search"}
                </button>
            </form>

            {error && <div className="text-center text-red-600">{error}</div>}
            <div className="w-full h-full">


                {/* Map */}
                <div className="w-full max-w-6xl h-[400px] rounded-lg overflow-hidden shadow-lg">
                    <MapContainer
                        center={[22.9734, 78.6569]}
                        zoom={5}
                        scrollWheelZoom
                        style={{ height: "100%", width: "100%" }}
                    >
                        <FullscreenControl />
                        <TileLayer
                            attribution="&copy; OpenStreetMap contributors"
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {jobs.map((job, idx) => (
                            <Marker
                                key={idx}
                                position={[job.coordinates.lat, job.coordinates.lng]}
                            >
                                <Popup minWidth={200}>
                                    <h3 className="font-semibold">{job.title}</h3>
                                    <p className="text-sm text-gray-600 mb-1">🏢 {job.company}</p>
                                    <p className="text-sm text-gray-600 mb-1">📍 {job.location}</p>
                                    <a
                                        href={job.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline inline-flex items-center text-sm"
                                    >
                                        View on Adzuna&nbsp;
                                        <FaExternalLinkAlt className="h-3 w-3" />
                                    </a>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div></div>
        </div>
    );
};

export default JobMapView;
