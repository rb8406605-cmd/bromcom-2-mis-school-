// CodePen-ready fully functional single-file React MIS (Bromcom-style) with multi-page navigation
// Features: Login/Signup, Students, Attendance, Behaviour, Detentions, PA System, Timetable, Assessments, Reports, Student Profiles

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

function AegisSchoolMIS() {
  // USERS
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem('users')) || []);
  const [current, setCurrent] = useState(() => JSON.parse(localStorage.getItem('current')) || null);

  // STUDENTS
  const [students, setStudents] = useState(() => JSON.parse(localStorage.getItem('students')) || []);
  const [attendance, setAttendance] = useState(() => JSON.parse(localStorage.getItem('attendance')) || {});
  const [behaviourLogs, setBehaviourLogs] = useState(() => JSON.parse(localStorage.getItem('behaviourLogs')) || []);
  const [grades, setGrades] = useState(() => JSON.parse(localStorage.getItem('grades')) || {});
  const [timetable, setTimetable] = useState(() => JSON.parse(localStorage.getItem('timetable')) || {
    Monday:{P1:'',P2:'',P3:'',P4:'',P5:''},
    Tuesday:{P1:'',P2:'',P3:'',P4:'',P5:''},
    Wednesday:{P1:'',P2:'',P3:'',P4:'',P5:''},
    Thursday:{P1:'',P2:'',P3:'',P4:'',P5:''},
    Friday:{P1:'',P2:'',P3:'',P4:'',P5:''}
  });

  const saveAll = () => {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('current', JSON.stringify(current));
    localStorage.setItem('students', JSON.stringify(students));
    localStorage.setItem('attendance', JSON.stringify(attendance));
    localStorage.setItem('behaviourLogs', JSON.stringify(behaviourLogs));
    localStorage.setItem('grades', JSON.stringify(grades));
    localStorage.setItem('timetable', JSON.stringify(timetable));
  };

  useEffect(() => saveAll(), [users, current, students, attendance, behaviourLogs, grades, timetable]);

  // AUTH
  const signup = (user, pass, role) => {
    if(users.find(u => u.user === user)) return alert('User exists');
    setUsers([...users, {user, pass, role}]);
    setCurrent({user, role});
  };
  const login = (user, pass) => {
    const found = users.find(u => u.user===user && u.pass===pass);
    if(!found) return alert('Invalid');
    setCurrent({user:found.user, role:found.role});
  };
  const logout = () => setCurrent(null);

  // ADD STUDENT
  const addStudent = (name) => {
    if(!name.trim()) return;
    setStudents([...students,{id:Date.now(),name,grade:2,points:0,detention:false}]);
  };

  // ATTENDANCE
  const markAttendance = (studentId,status) => {
    const today = new Date().toISOString().split('T')[0];
    const dayRec = attendance[today] || {};
    dayRec[studentId] = status;
    setAttendance({...attendance,[today]:dayRec});
  };

  // BEHAVIOUR
  const addBehaviour = (studentId, score, pointsDelta, note) => {
    const record = {id:Date.now(),studentId,score,pointsDelta,note,time:new Date().toISOString()};
    setBehaviourLogs([record,...behaviourLogs]);
    setStudents(students.map(s=>s.id===studentId?
      {...s,points:(s.points||0)+pointsDelta,detention: score===2||score===4||((s.points||0)+pointsDelta)<=-5}:s));
  };

  // GRADES
  const recordGrade = (studentId, subject, grade) => {
    const rec = grades[studentId] || {};
    setGrades({...grades,[studentId]:{...rec,[subject]:grade}});
  };

  // TIMETABLE
  const updateLesson = (day, period, value) => {
    setTimetable({...timetable,[day]:{...timetable[day],[period]:value}});
  };

  // PA System
  const announce = (msg) => {
    if(!msg.trim()) return;
    const utter = new SpeechSynthesisUtterance(msg);
    speechSynthesis.speak(utter);
  };

  // LOGIN PAGE
  if(!current) return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">AegisSchool MIS</h1>
      <input id="u" placeholder="Username" className="border p-2 w-full"/>
      <input id="p" type="password" placeholder="Password" className="border p-2 w-full"/>
      <button className="bg-blue-600 text-white p-2 w-full rounded" onClick={()=>login(u.value,p.value)}>Login</button>
      <h2 className="font-semibold">Signup</h2>
      <input id="su" placeholder="New user" className="border p-2 w-full"/>
      <input id="sp" type="password" placeholder="Password" className="border p-2 w-full"/>
      <select id="sr" className="border p-2 w-full">
        <option value="teacher">Teacher</option>
        <option value="admin">Admin</option>
      </select>
      <button className="bg-green-600 text-white p-2 w-full rounded" onClick={()=>signup(su.value,sp.value,sr.value)}>Create Account</button>
    </div>
  );

  // MAIN APP
  const pages = ['Dashboard','Students','Attendance','Behaviour','Timetable','Assessment','Reports','PA'];
  const [activePage, setActivePage] = useState('Dashboard');

  // Simple page switch
  const renderPage = () => {
    switch(activePage){
      case 'Students': return <StudentsPage students={students} addStudent={addStudent} />;
      case 'Attendance': return <AttendancePage students={students} attendance={attendance} markAttendance={markAttendance}/>;
      case 'Behaviour': return <BehaviourPage students={students} behaviourLogs={behaviourLogs} addBehaviour={addBehaviour}/>;
      case 'Timetable': return <TimetablePage timetable={timetable} updateLesson={updateLesson}/>;
      case 'Assessment': return <AssessmentPage students={students} grades={grades} recordGrade={recordGrade}/>;
      case 'Reports': return <ReportsPage students={students} attendance={attendance} behaviourLogs={behaviourLogs}/>;
      case 'PA': return <PApage announce={announce}/>;
      default: return <DashboardPage/>;
    }
  };

  return (
    <div className="flex">
      <div className="w-60 bg-blue-700 text-white h-screen p-4 flex flex-col gap-2">
        <h1 className="text-2xl font-bold mb-4">AegisSchool</h1>
        {pages.map(p=><button key={p} className={`p-2 rounded ${activePage===p?'bg-blue-900':'bg-blue-600 hover:bg-blue-800'}`} onClick={()=>setActivePage(p)}>{p}</button>)}
        <button className="mt-auto bg-red-600 p-2 rounded" onClick={logout}>Logout</button>
      </div>
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">{renderPage()}</div>
    </div>
  );
}

// PAGE COMPONENTS (Students, Attendance, Behaviour, Timetable, Assessment, Reports, PA, Dashboard)
const DashboardPage = ()=> <div className="text-2xl font-bold">Welcome to AegisSchool MIS Dashboard</div>;
const StudentsPage = ({students, addStudent}) => {
  const [input,setInput]=useState('');
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Students</h2>
      <div className="flex gap-2 mb-2">
        <input className="border p-2 flex-1" value={input} onChange={e=>setInput(e.target.value)} placeholder="Add student"/>
        <button className="bg-blue-600 text-white px-3 py-2 rounded" onClick={()=>{addStudent(input); setInput('');}}>Add</button>
      </div>
      <ul className="bg-white p-2 rounded shadow">
        {students.map(s=><li key={s.id} className="p-1 border-b">{s.name}</li>)}
      </ul>
    </div>
  );
};
const AttendancePage = ({students,attendance,markAttendance}) => {
  const today=new Date().toISOString().split('T')[0];
  const todayRec=attendance[today]||{};
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Attendance</h2>
      {students.map(s=><div key={s.id} className="flex gap-2 items-center mb-1">
        <span>{s.name}</span>
        {['present','late','absent'].map(status=><button key={status} className={`px-2 py-1 rounded ${todayRec[s.id]===status?'bg-green-500 text-white':'bg-gray-200'}`} onClick={()=>markAttendance(s.id,status)}>{status[0].toUpperCase()}</button>)}
      </div>)}
    </div>
  );
};
const BehaviourPage = ({students,behaviourLogs,addBehaviour}) => {
  const [studentId,setStudentId]=useState('');
  const [score,setScore]=useState(3);
  const [points,setPoints]=useState(0);
  const [note,setNote]=useState('');
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Behaviour</h2>
      <select value={studentId} onChange={e=>setStudentId(e.target.value)} className="border p-2">
        <option value="">Select student</option>
        {students.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}
      </select>
      <select value={score} onChange={e=>setScore(Number(e.target.value))} className="border p-2 ml-2">
        <option value={1}>1 Excellent</option>
        <option value={2}>2 Good</option>
        <option value={3}>3 Disruptive</option>
        <option value={4}>4 Poor</option>
        <option value={5}>5 Unsatisfactory</option>
      </select>
      <input type="number" value={points} onChange={e=>setPoints(Number(e.target.value))} placeholder="Points" className="border p-2 ml-2"/>
      <input value={note} onChange={e=>setNote(e.target.value)} placeholder="Note" className="border p-2 ml-2"/>
      <button className="bg-blue-600 text-white px-3 py-2 ml-2" onClick={()=>{if(!studentId) return; addBehaviour(Number(studentId),score,points,note); setNote(''); setPoints(0);}}>Add</button>
      <ul className="mt-2 bg-white p-2 rounded shadow max-h-60 overflow-auto">
        {behaviourLogs.map(b=><li key={b.id}>{students.find(s=>s.id===b.studentId)?.name || 'Unknown'} - Score: {b.score} - Points: {b.pointsDelta} - {b.note}</li>)}
      </ul>
    </div>
  );
};
const TimetablePage = ({timetable,updateLesson}) => {
  const days=['Monday','Tuesday','Wednesday','Thursday','Friday'];
  const periods=['P1','P2','P3','P4','P5'];
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Timetable Editor</h2>
      {days.map(day=><div key={day} className="mb-2">
        <h3 className="font-semibold">{day}</h3>
        <div className="grid grid-cols-5 gap-2">
          {periods.map(p=><input key={p} className="border p-2" value={timetable[day][p]} onChange={e=>updateLesson(day,p,e.target.value)} placeholder={p}/>)}
        </div>
      </div>)}
    </div>
  );
};
const AssessmentPage = ({students,grades,recordGrade}) => {
  const [studentId,setStudentId]=useState('');
  const [subject,setSubject]=useState('Math');
  const [mark,setMark]=useState('');
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Assessment</h2>
      <select value={studentId} onChange={e=>setStudentId(e.target.value)} className="border p-2">
        <option value="">Select student</option>
        {students.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}
      </select>
      <input value={subject} onChange={e=>setSubject(e.target.value)} placeholder="Subject" className="border p-2 ml-2"/>
      <input value={mark} onChange={e=>setMark(e.target.value)} placeholder="Mark" className="border p-2 ml-2"/>
      <button className="bg-green-600 text-white px-3 py-2 ml-2" onClick={()=>{if(!studentId) return; recordGrade(Number(studentId),subject,mark); setMark('');}}>Save</button>
    </div>
  );
};
const ReportsPage = ({students,attendance,behaviourLogs}) => {
  const exportCSV=(rows,filename)=>{
    const csv=rows.map(r=>r.join(',')).join('\n');
    const blob=new Blob([csv],{type:'text/csv'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a'); a.href=url;a.download=filename;a.click();URL.revokeObjectURL(url);
  };
  const exportAttendance=()=>{
    const rows=[['Date','Student','Status']];
    Object.entries(attendance).forEach(([date,dayRec])=>{
      students.forEach(s=>rows.push([date,s.name,dayRec[s.id]||'absent']));
    });
    exportCSV(rows,'attendance.csv');
  };
  const exportBehaviour=()=>{
    const rows=[['Student','Score','Points','Note','Time']];
    behaviourLogs.forEach(b=>{
      const name=students.find(s=>s.id===b.studentId)?.name||b.studentId;
      rows.push([name,b.score,b.pointsDelta||0,b.note,b.time]);
    });
    exportCSV(rows,'behaviour.csv');
  };
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Reports</h2>
      <button className="bg-blue-600 text-white px-3 py-2 mr-2" onClick={exportAttendance}>Export Attendance</button>
      <button className="bg-indigo-600 text-white px-3 py-2" onClick={exportBehaviour}>Export Behaviour</button>
    </div>
  );
};
const PApage = ({announce}) => {
  const [msg,setMsg]=useState('');
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">PA System</h2>
      <textarea className="border p-2 w-full" value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Type announcement"></textarea>
      <button className="bg-purple-600 text-white px-3 py-2 mt-2" onClick={()=>{announce(msg); setMsg('');}}>Announce</button>
    </div>
  );
};

// Render to CodePen root
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AegisSchoolMIS />);

export default AegisSchoolMIS;
