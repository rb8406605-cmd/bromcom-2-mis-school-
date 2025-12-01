# AegisSchool MIS - School Management Information System

A fully functional, single-file React Management Information System (MIS) with Bromcom-style design and multi-page navigation.

![React](https://img.shields.io/badge/React-18+-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-green) ![License](https://img.shields.io/badge/License-Open%20Source-brightgreen)

## 🚀 Live Demo

**Open `index.html` directly in your browser - no installation needed!**

- Works offline with localStorage data persistence
- Fully responsive design
- Text-to-speech PA system
- Export reports to CSV

## ✨ Features

- **🔐 Authentication**: Login/Signup with role-based access (Teacher/Admin)
- **👥 Student Management**: Add, view students with detention tracking and points system
- **📋 Attendance Tracking**: Daily attendance marking (Present/Late/Absent)
- **📊 Behaviour Logs**: Track student behaviour scores with point deductions
- **⛔ Detention System**: Automatic detention flagging based on behaviour scores
- **📅 Timetable Editor**: 5-period schedule management (Monday-Friday)
- **📝 Assessments**: Subject-specific grade recording and tracking
- **📈 Reports**: CSV export for attendance and behaviour data
- **🔊 PA System**: Text-to-speech announcements
- **🏠 Dashboard**: Welcome page with navigation sidebar
- **💾 Data Persistence**: All data saved to browser localStorage

## 🎯 Getting Started

### Option 1: Online (Easiest) ⭐
1. Open `index.html` in your browser
2. Create an account (first time users)
3. Start using the system

### Option 2: Deploy Online

#### Google Drive
1. Upload `index.html` to Google Drive
2. Right-click → Share → Get link
3. Change sharing URL from `/file/` to `/file/d/{FILE_ID}/preview`

#### GitHub Pages
```bash
git clone https://github.com/rb8406605-cmd/bromcom-2-mis-school-
cd bromcom-2-mis-school-
# Push to your GitHub repo with index.html
# Enable Pages in Settings → Pages → Deploy from main branch
```

#### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=.
```

#### Cloud Hosting Options
- **Heroku**: Free tier deprecated, use Render or Railway
- **Railway**: Drag-and-drop deployment
- **Render**: Easy setup with GitHub integration
- **Hostinger**: Affordable shared hosting

### Option 3: CodePen
1. Go to [CodePen.io](https://codepen.io)
2. Copy code from `AegisSchoolMIS.jsx`
3. Add Tailwind CSS via Settings > CSS:
   ```
   https://cdn.tailwindcss.com
   ```
4. Set HTML to: `<div id="root"></div>`

### Option 4: Local Development
```bash
# Clone the repository
git clone https://github.com/rb8406605-cmd/bromcom-2-mis-school-

# Install Node.js if not already installed
# Then install dependencies
npm install

# Start development server
npm start
```

## 📖 Usage Guide

### First-Time Setup
1. Open the application
2. Click "Create Account" section
3. Enter username and password
4. Select your role (Teacher or Admin)
5. Click "Create Account"

### Adding Students
1. Navigate to **Students** page
2. Enter student name in input field
3. Click "Add Student" button
4. Students appear in the list below

### Marking Attendance
1. Go to **Attendance** page
2. For each student, click:
   - **P** = Present
   - **L** = Late
   - **A** = Absent
3. Data saves automatically to today's date

### Recording Behaviour
1. Navigate to **Behaviour** page
2. Select student from dropdown
3. Choose behaviour score:
   - 1 = Excellent
   - 2 = Good (auto-detention)
   - 3 = Disruptive
   - 4 = Poor (auto-detention)
   - 5 = Unsatisfactory
4. Enter points delta (+ or -)
5. Add optional note
6. Click "Record Behaviour"
7. **Auto-detention triggered** if score is 2/4 OR cumulative points ≤ -5

### Managing Timetable
1. Go to **Timetable** page
2. For each day, enter lesson names for periods P1-P5
3. Changes save automatically

### Recording Assessments
1. Navigate to **Assessment** page
2. Select student
3. Enter subject name
4. Enter mark/grade
5. Click "Save Grade"

### Exporting Reports
1. Go to **Reports** page
2. Click "Export Attendance CSV" or "Export Behaviour CSV"
3. CSV file downloads automatically
4. Open in Excel or Google Sheets

### Using PA System
1. Navigate to **PA** page
2. Type announcement in text area
3. Click "Announce"
4. Browser uses text-to-speech (works best in Chrome)

## 🔧 Behaviour Points System

| Score | Level | Auto-Detention | Notes |
|-------|-------|-----------------|-------|
| 1 | Excellent | No | 0 points |
| 2 | Good | **Yes** | Automatic detention |
| 3 | Disruptive | If points ≤ -5 | Custom points |
| 4 | Poor | **Yes** | Automatic detention |
| 5 | Unsatisfactory | If points ≤ -5 | Custom points |

**Detention is triggered when:**
- Behaviour score is 2 or 4, OR
- Cumulative student points ≤ -5

## 💾 Data Management

### Where Data is Stored
- **Browser localStorage** - automatically synced
- Survives browser refresh
- Specific to device/browser

### Backup Your Data
1. Go to **Reports** page
2. Export Attendance and Behaviour CSV files
3. Save files to computer

### Clear All Data
⚠️ **Warning**: This is permanent!
1. Open browser DevTools (F12)
2. Go to **Application** tab
3. Click **Local Storage**
4. Click your domain
5. Right-click → Delete all

## 🛠️ Technology Stack

- **React 18+** - UI framework
- **Tailwind CSS** - Styling
- **LocalStorage API** - Data persistence
- **Web Speech API** - PA System

## 🌐 Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Best performance |
| Edge | ✅ Full | Excellent support |
| Firefox | ✅ Full | Works great |
| Safari | ✅ Full | Text-to-speech may vary |
| Mobile | ✅ Responsive | Works on phones/tablets |

## 📱 Mobile Usage

- Fully responsive design
- Touch-friendly buttons
- Works on iOS Safari, Chrome Mobile, etc.
- Data syncs across devices (if same localStorage)

## 🔐 Security Notes

⚠️ **Important:**
- Passwords stored in browser localStorage (not encrypted)
- For production: Implement backend authentication
- This is suitable for demo/educational use only
- Do NOT use with real sensitive student data without backend security

## 🚀 Deployment Checklist

- [ ] Test all pages work
- [ ] Add test students
- [ ] Test attendance marking
- [ ] Test behaviour recording
- [ ] Export CSV reports
- [ ] Test PA system
- [ ] Deploy to hosting
- [ ] Share public link

## 📝 Example Test Account

- **Username**: demo
- **Password**: demo123
- **Role**: Teacher

(Create these during first signup)

## 🐛 Troubleshooting

**Data not saving?**
- Check browser allows localStorage
- Disable private/incognito mode
- Clear browser cache

**Text-to-speech not working?**
- Works best in Chrome
- Check system volume is on
- Some systems disable Web Speech API

**Styling looks broken?**
- Make sure index.html is open (not JSX file)
- Check internet connection (CDN resources)
- Clear browser cache

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/rb8406605-cmd/bromcom-2-mis-school-/issues)
- **Discussion**: GitHub Discussions

## 📄 License

Open source - free to use, modify, and distribute

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📊 Project Stats

- **Version**: 1.0.0
- **Last Updated**: December 2025
- **Author**: rb8406605-cmd
- **Lines of Code**: ~350
- **Single File**: Yes - Easy to deploy!

## 🎓 Educational Use

This project is perfect for:
- Learning React fundamentals
- Understanding state management
- Building CRUD applications
- Learning localStorage
- UI design with Tailwind CSS

## 🚀 Next Steps

1. **Deploy to Vercel** (1 minute)
2. **Share the public link** with teachers
3. **Add more students** and test
4. **Export reports** to verify CSV functionality

---

**Ready to use? Just open `index.html` in your browser! 🎉**