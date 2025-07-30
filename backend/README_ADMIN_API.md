# Admin API Documentation

This document describes all the admin-specific API endpoints for managing nominations.

## Base URL
```
http://localhost:3000/register
```

## Authentication
All admin endpoints require proper authentication. Ensure you have admin privileges to access these endpoints.

## Endpoints

### 1. Get All Nominations (with filtering)
**GET** `/admin/nominations`

Get all nominations with optional filtering capabilities.

**Query Parameters:**
- `search` (optional): Search by student name (case-insensitive)
- `class` (optional): Filter by class (e.g., "Class 10")
- `exam` (optional): Filter by exam name (e.g., "National Science Olympiad")
- `status` (optional): Filter by status ("pending", "approved", "rejected")

**Example Request:**
```
GET /admin/nominations?search=john&class=Class 10&status=pending
```

**Response:**
```json
{
  "nominations": [
    {
      "id": "507f1f77bcf86cd799439011",
      "studentName": "John Doe",
      "class": "Class 10",
      "exam": "National Science Olympiad",
      "status": "pending",
      "year": "2024",
      "performance": "Excellent",
      "reason": "Outstanding performance",
      "dream": "To become a scientist",
      "remarks": null,
      "fileUploaded": true,
      "fileName": "john_doe_certificate.zip",
      "fileUrl": "https://bucket.s3.region.amazonaws.com/uploads/1234567890-john_doe_certificate.zip",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "total": 1
}
```

### 2. Get Nomination Details
**GET** `/admin/nominations/:id`

Get detailed information about a specific nomination.

**Path Parameters:**
- `id`: Nomination ID

**Example Request:**
```
GET /admin/nominations/507f1f77bcf86cd799439011
```

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "studentName": "John Doe",
  "class": "Class 10",
  "exam": "National Science Olympiad",
  "status": "pending",
  "year": "2024",
  "performance": "Excellent",
  "reason": "Outstanding performance",
  "dream": "To become a scientist",
  "remarks": null,
  "fileUploaded": true,
  "fileName": "john_doe_certificate.zip",
  "fileUrl": "https://bucket.s3.region.amazonaws.com/uploads/1234567890-john_doe_certificate.zip",
  "fileSize": 1024000,
  "fileMimeType": "application/zip",
  "fatherName": "Robert Doe",
  "motherName": "Jane Doe",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### 3. Update Nomination Status
**PUT** `/admin/nominations/:id/status`

Update the status of a specific nomination.

**Path Parameters:**
- `id`: Nomination ID

**Request Body:**
```json
{
  "status": "approved",
  "remarks": "Excellent performance, approved for scholarship"
}
```

**Status Options:**
- `pending`: Nomination is under review
- `approved`: Nomination has been approved
- `rejected`: Nomination has been rejected

**Example Request:**
```
PUT /admin/nominations/507f1f77bcf86cd799439011/status
Content-Type: application/json

{
  "status": "approved",
  "remarks": "Outstanding academic performance"
}
```

**Response:**
```json
{
  "message": "Nomination status updated successfully",
  "nomination": {
    "id": "507f1f77bcf86cd799439011",
    "studentName": "John Doe",
    "status": "approved",
    "remarks": "Outstanding academic performance",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

### 4. Bulk Update Status
**POST** `/admin/nominations/bulk-status`

Update the status of multiple nominations at once.

**Request Body:**
```json
{
  "ids": ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012"],
  "status": "approved",
  "remarks": "Bulk approval for outstanding candidates"
}
```

**Example Request:**
```
POST /admin/nominations/bulk-status
Content-Type: application/json

{
  "ids": ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012"],
  "status": "approved",
  "remarks": "Bulk approval for outstanding candidates"
}
```

**Response:**
```json
{
  "message": "Successfully updated 2 nominations",
  "updatedCount": 2,
  "totalRequested": 2
}
```

### 5. Get Admin Statistics
**GET** `/admin/statistics`

Get comprehensive statistics about nominations.

**Example Request:**
```
GET /admin/statistics
```

**Response:**
```json
{
  "totalNominations": 150,
  "statusBreakdown": {
    "pending": 45,
    "approved": 85,
    "rejected": 20
  },
  "classDistribution": [
    {
      "_id": "Class 9",
      "count": 25
    },
    {
      "_id": "Class 10",
      "count": 35
    },
    {
      "_id": "Class 11",
      "count": 45
    },
    {
      "_id": "Class 12",
      "count": 45
    }
  ],
  "examDistribution": [
    {
      "_id": "National Science Olympiad",
      "count": 50
    },
    {
      "_id": "National Mathematics Olympiad",
      "count": 40
    },
    {
      "_id": "National English Olympiad",
      "count": 35
    },
    {
      "_id": "National Social Studies Olympiad",
      "count": 25
    }
  ],
  "recentNominations": 12,
  "lastUpdated": "2024-01-15T11:00:00.000Z"
}
```

### 6. Download Nomination File
**GET** `/admin/nominations/:id/download`

Download the uploaded file for a specific nomination.

**Path Parameters:**
- `id`: Nomination ID

**Example Request:**
```
GET /admin/nominations/507f1f77bcf86cd799439011/download
```

**Response:**
- File download with proper headers
- Content-Type: Based on file type
- Content-Disposition: attachment; filename="original_filename.zip"

**Error Response (404):**
```json
{
  "message": "No file available for this nomination"
}
```

## Error Handling

All endpoints return appropriate HTTP status codes:

- **200**: Success
- **400**: Bad Request (invalid parameters)
- **404**: Not Found (nomination not found)
- **500**: Internal Server Error

**Error Response Format:**
```json
{
  "message": "Error description",
  "statusCode": 400
}
```

## Rate Limiting

Admin endpoints are subject to rate limiting to prevent abuse. Please implement appropriate delays between requests.

## Security Considerations

1. All endpoints require admin authentication
2. Input validation is performed on all parameters
3. File downloads are restricted to admin users only
4. Bulk operations are limited to prevent abuse

## Testing

You can test these endpoints using tools like:
- Postman
- cURL
- Insomnia

**Example cURL commands:**

```bash
# Get all nominations
curl -X GET "http://localhost:3000/register/admin/nominations"

# Get filtered nominations
curl -X GET "http://localhost:3000/register/admin/nominations?status=pending&class=Class%2010"

# Update nomination status
curl -X PUT "http://localhost:3000/register/admin/nominations/507f1f77bcf86cd799439011/status" \
  -H "Content-Type: application/json" \
  -d '{"status": "approved", "remarks": "Excellent performance"}'

# Get statistics
curl -X GET "http://localhost:3000/register/admin/statistics"
``` 