## ADDED Requirements

### Requirement: Announcement Megamenu
The system MUST display a Megamenu in the banner containing up to 7 announcements from the past month, sorted by date descending. Only the titles should be displayed.

#### Scenario: Display latest announcements
- **WHEN** the user hovers or clicks the announcement banner
- **THEN** a Megamenu opens showing at most 7 announcement titles from the last 30 days
- **THEN** the items are sorted with the newest at the top

#### Scenario: View all announcements from Megamenu
- **WHEN** the user clicks "查看全部" in the Megamenu
- **THEN** the Megamenu closes
- **THEN** the system navigates to the Announcement List Page

#### Scenario: View specific announcement from Megamenu
- **WHEN** the user clicks on an announcement title in the Megamenu
- **THEN** the Megamenu closes
- **THEN** the system navigates to the Announcement Detail Page for that specific announcement

### Requirement: Announcement List Page
The system MUST provide a List Page displaying all announcements with pagination, showing at most 6 items per page. The content MUST be truncated if it exceeds 100 characters.

#### Scenario: Paginated list display
- **WHEN** the user navigates to the Announcement List Page
- **THEN** the system displays up to 6 announcements
- **THEN** a pagination control is available to browse further pages

#### Scenario: Content truncation
- **WHEN** an announcement has content longer than 100 characters
- **THEN** the displayed content is truncated at 100 characters
- **THEN** a "了解更多" link is displayed below it

#### Scenario: Navigate to detail from list
- **WHEN** the user clicks "了解更多" on a list item
- **THEN** the system navigates to the Announcement Detail Page for that announcement

### Requirement: Announcement Detail Page
The system MUST provide a Detail Page showing the full content of a specific announcement.

#### Scenario: View full announcement
- **WHEN** the user navigates to an Announcement Detail Page
- **THEN** the full title, date, and content of the announcement are displayed
