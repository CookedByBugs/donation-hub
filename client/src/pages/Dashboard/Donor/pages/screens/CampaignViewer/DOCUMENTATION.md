# Campaign Viewer Page - Documentation

## Overview

The Campaign Viewer page is a comprehensive, visually rich interface that displays detailed information about a specific fundraising campaign. It provides donors with all the information they need to understand the campaign's purpose, progress, and impact before making a donation.

## File Location

```
client/src/pages/Dashboard/Donor/pages/screens/CampaignViewer/index.jsx
```

## Features

### 1. **Campaign Header**

- **Campaign Title**: Large, prominent display of the campaign name
- **Category Badge**: Color-coded badge showing campaign category (Education, Health, Disaster Relief, Other)
- **Status Indicator**: Shows whether the campaign is active
- **Start Date**: Displays when the campaign was created

### 2. **Image Carousel**

- Auto-playing carousel of campaign images
- Swipeable on touch devices
- Smooth transitions between images
- Full-width responsive design

### 3. **Fundraising Progress Card**

- **Amount Display**: Shows both raised amount and goal amount in formatted currency
- **Progress Percentage**: Real-time calculation of fundraising progress
- **Visual Progress Bar**: Color-coded based on progress level
  - 🔴 Orange (0-25%)
  - 🟡 Yellow (25-50%)
  - 🔵 Blue (50-75%)
  - 🟣 Primary Purple (75-100%)
  - 🟢 Green (100%+)
- **Remaining Amount**: Shows how much more is needed to reach the goal
- **Goal Achievement Banner**: Celebratory message when goal is reached

### 4. **Campaign Timeline Card**

- **Start Date**: When the campaign was launched
- **End Date**: Campaign deadline
- **Days Remaining**: Real-time countdown with color-coded urgency
  - 🟢 Green (>7 days)
  - 🟠 Orange (1-7 days)
  - 🔴 Red (Ended)

### 5. **Organizer Information Card**

- NGO/Organization details
- Verified organizer badge
- Visual avatar with organization initial

### 6. **Campaign Description**

- Rich HTML content support
- Expandable/collapsible for long descriptions
- Gradient fade effect for collapsed state
- "Show more/less" toggle button

### 7. **Payment Section**

- Integrated payment form
- Secure payment indicators
- Trust badges and security messaging

## Component Structure

```jsx
CampaignViewer
├── Header Section
│   ├── Title
│   ├── Category Badge
│   ├── Status Badge
│   └── Start Date
├── Left Column (Images & Statistics)
│   ├── Image Carousel
│   ├── Fundraising Progress Card
│   ├── Timeline Card
│   └── Organizer Card
└── Right Column (Description & Payment)
    ├── Description Section
    ├── Payment Form
    └── Trust Indicators
```

## Data Flow

### API Integration

The component fetches campaign data from the backend API:

```javascript
GET ${VITE_API_URL}/api/campaign/get/${id}
Headers: { Authorization: `Bearer ${authToken}` }
```

### Campaign Data Structure

```javascript
{
  _id: String,
  title: String,
  goalAmount: Number,
  raisedAmount: Number,
  category: String, // 'education' | 'health' | 'disaster' | 'others'
  endDate: String,
  image: [String],
  description: String,
  createdBy: ObjectId,
  status: String, // 'active' | 'inactive'
  createdAt: Date,
  updatedAt: Date
}
```

## Helper Functions

### 1. **Progress Percentage Calculation**

```javascript
const progressPercentage = campaign.goalAmount
  ? Math.min(
      Math.round((campaign.raisedAmount / campaign.goalAmount) * 100),
      100,
    )
  : 0;
```

Calculates the percentage of the goal that has been reached, capped at 100%.

### 2. **Days Remaining Calculation**

```javascript
const getDaysRemaining = () => {
  if (!campaign.endDate) return null;
  const endDate = new Date(campaign.endDate);
  const today = new Date();
  const diffTime = endDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};
```

Calculates the number of days remaining until the campaign ends.

### 3. **Currency Formatting**

```javascript
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount || 0);
};
```

Formats numbers as USD currency without decimal places.

### 4. **Category Information**

```javascript
const getCategoryInfo = (category) => {
  const categories = {
    education: { label: "Education", color: "bg-blue-500", icon: "📚" },
    health: { label: "Health", color: "bg-green-500", icon: "🏥" },
    disaster: { label: "Disaster Relief", color: "bg-red-500", icon: "🆘" },
    others: { label: "Other", color: "bg-purple-500", icon: "💡" },
  };
  return categories[category] || categories.others;
};
```

Returns display information for each campaign category including label, color, and emoji icon.

### 5. **Progress Bar Color**

```javascript
const getProgressColor = () => {
  if (progressPercentage >= 100) return "bg-success";
  if (progressPercentage >= 75) return "bg-primary";
  if (progressPercentage >= 50) return "bg-blue-500";
  if (progressPercentage >= 25) return "bg-yellow-500";
  return "bg-orange-500";
};
```

Returns the appropriate color class based on fundraising progress.

## UI Design Elements

### Color Scheme

- **Primary**: `#6C48C5` (Purple) - Main brand color
- **Success**: `#28A745` (Green) - Achievements and positive indicators
- **Blue**: `#3B82F6` - Information and secondary actions
- **Orange**: `#F97316` - Warnings and urgency
- **Red**: `#DC3545` - Danger and critical information

### Visual Effects

1. **Gradient Backgrounds**: Subtle gradients on cards for depth
2. **Shadow Effects**: Layered shadows for card elevation
3. **Rounded Corners**: Consistent 2xl border radius for modern look
4. **Transitions**: Smooth 500ms transitions on progress bar
5. **Hover Effects**: Underline on "show more" button

### Typography

- **Headings**: Bold, large font sizes (2xl-5xl)
- **Body Text**: Regular weight, gray-700 for readability
- **Labels**: Small, semibold for emphasis
- **Currency**: Large, bold for visual impact

## Responsive Design

### Breakpoints

- **Mobile** (xs, sm): Single column layout, stacked sections
- **Tablet** (md): Two-column layout begins
- **Desktop** (lg, xl): Full two-column layout with optimal spacing

### Mobile Optimizations

- Reduced font sizes on mobile (text-4xl → md:text-5xl)
- Full-width cards on small screens
- Touch-friendly carousel controls
- Adequate padding and spacing for touch targets

## Accessibility Features

1. **Semantic HTML**: Proper heading hierarchy (h1, h2, h3)
2. **Color Contrast**: High contrast text on backgrounds
3. **Descriptive Labels**: Clear labels for all data points
4. **Keyboard Navigation**: Clickable elements are keyboard accessible
5. **Screen Reader Support**: Meaningful text content for screen readers

## Performance Considerations

1. **Conditional Rendering**: Only renders elements when data is available
2. **Memoization Opportunities**: Helper functions could be memoized with `useMemo`
3. **Image Optimization**: Carousel images should be optimized before upload
4. **Lazy Loading**: Consider lazy loading for images below the fold

## Customization Guide

### Adding New Category Types

To add a new category, update the `getCategoryInfo` function:

```javascript
const categories = {
  education: { label: "Education", color: "bg-blue-500", icon: "📚" },
  health: { label: "Health", color: "bg-green-500", icon: "🏥" },
  disaster: { label: "Disaster Relief", color: "bg-red-500", icon: "🆘" },
  environment: { label: "Environment", color: "bg-green-600", icon: "🌱" }, // NEW
  others: { label: "Other", color: "bg-purple-500", icon: "💡" },
};
```

### Changing Progress Bar Colors

Modify the `getProgressColor` function to use different color thresholds:

```javascript
const getProgressColor = () => {
  if (progressPercentage >= 100) return "bg-green-600";
  if (progressPercentage >= 80) return "bg-green-500";
  if (progressPercentage >= 60) return "bg-blue-500";
  if (progressPercentage >= 40) return "bg-yellow-500";
  if (progressPercentage >= 20) return "bg-orange-500";
  return "bg-red-500";
};
```

### Adjusting Description Preview Length

Change the character limit in the description section:

```javascript
// Current: 500 characters
campaign.description?.slice(0, 500);

// Change to 300 characters
campaign.description?.slice(0, 300);
```

## Integration with Payment Component

The Campaign Viewer integrates with the Payment component by passing the campaign object:

```jsx
<Payment campaign={campaign} />
```

The Payment component receives:

- Campaign ID for transaction tracking
- Goal amount for suggested donation amounts
- Campaign title for payment confirmation

## Error Handling

The component includes basic error handling:

```javascript
try {
  const res = await axios.get(/* ... */);
  setCampaign(res.data.campaign);
  setImages(res.data.campaign.image);
} catch (error) {
  console.error(error);
  // Consider adding user-friendly error message display
}
```

**Recommended Enhancement**: Add error state and display user-friendly error messages:

```javascript
const [error, setError] = useState(null);

// In catch block:
setError("Failed to load campaign. Please try again later.");

// In render:
{
  error && <div className="error-message">{error}</div>;
}
```

## Testing Checklist

- [ ] Campaign loads correctly with valid ID
- [ ] Progress percentage calculates correctly
- [ ] Days remaining shows accurate countdown
- [ ] Currency formatting displays properly
- [ ] Category badges show correct colors and icons
- [ ] Image carousel auto-plays and is swipeable
- [ ] Description expands/collapses correctly
- [ ] Payment form integrates properly
- [ ] Responsive design works on mobile, tablet, desktop
- [ ] Goal achievement message shows when 100% reached
- [ ] Campaign ended message shows when deadline passed
- [ ] All dates format correctly in user's locale

## Future Enhancements

1. **Donor Count**: Add number of donors to progress card
2. **Recent Donations**: Show recent donation activity
3. **Social Sharing**: Add share buttons for social media
4. **Updates Section**: Allow organizers to post campaign updates
5. **Comments**: Enable donors to leave comments
6. **Bookmark**: Allow users to save campaigns for later
7. **Similar Campaigns**: Suggest related campaigns
8. **Impact Metrics**: Show specific impact numbers (e.g., "feeds 100 families")
9. **Loading States**: Add skeleton screens while data loads
10. **Error Boundaries**: Implement React error boundaries

## Dependencies

- `react` - Core React library
- `react-router-dom` - For URL parameter handling (`useParams`)
- `axios` - HTTP client for API calls
- `antd` - Ant Design components (Row, Col for grid layout)
- `react-responsive-carousel` - Image carousel component

## Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ IE11 (requires polyfills for Intl.NumberFormat)

## Conclusion

The Campaign Viewer page provides a comprehensive, visually appealing interface for donors to learn about campaigns and make informed donation decisions. The component is designed with user experience, accessibility, and maintainability in mind, making it easy to extend and customize for future needs.
