import { useState } from "react";

function Student() {
    const [visible, setVisible] = useState(true);

    const studentList = [
        { name: 'Tommy', RollNumber: 1 },
        { name: 'Pluto', RollNumber: 2 },
        { name: 'Sundae', RollNumber: 3 },
    ];

    const handleClick = () => {
        setVisible(!visible);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h2>Student List</h2>
            <button onClick={handleClick} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
                {visible ? 'Hide Students' : 'Show Students'}
            </button>

            {visible && (
                <div style={{ marginTop: '20px' }}>
                    {studentList.map((student) => (
                        <div key={student.RollNumber} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
                            <p><strong>Name:</strong> {student.name}</p>
                            <p><strong>Roll Number:</strong> {student.RollNumber}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Student;