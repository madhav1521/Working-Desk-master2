import React, { useState, useRef } from 'react';
import { Box, Typography, Button, CircularProgress, IconButton, Alert } from '@mui/material';
import { CloudUpload, Close, PhotoCamera } from '@mui/icons-material';
import { uploadBookingPhotos } from '../../services/booking.service';
import { BASE_URL } from '../../services/api';

interface PhotoUploadProps {
  bookingId: number;
  existingPhotos?: string[];
  onUploadComplete?: (photos: string[]) => void;
  maxFiles?: number;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({
  bookingId, existingPhotos = [], onUploadComplete, maxFiles = 5,
}) => {
  const [previews, setPreviews] = useState<{ file: File; url: string }[]>([]);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setError('');
    setSuccess('');
    const remaining = maxFiles - existingPhotos.length - previews.length;
    const toAdd = files.slice(0, remaining);

    const newPreviews = toAdd.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setPreviews((p) => [...p, ...newPreviews]);
    if (e.target) e.target.value = '';
  };

  const removePreview = (index: number) => {
    setPreviews((p) => {
      URL.revokeObjectURL(p[index].url);
      return p.filter((_, i) => i !== index);
    });
  };

  const handleUpload = async () => {
    if (previews.length === 0) return;
    setUploading(true);
    setError('');
    try {
      const photoUrls = await uploadBookingPhotos(bookingId, previews.map((p) => p.file));
      setSuccess(`${photoUrls.length} photo${photoUrls.length > 1 ? 's' : ''} uploaded successfully!`);
      setPreviews([]);
      if (onUploadComplete) onUploadComplete(photoUrls);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const totalPhotos = existingPhotos.length + previews.length;
  const canAdd = totalPhotos < maxFiles;

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom sx={{ color: '#555', fontWeight: 600 }}>
        Service Photos ({totalPhotos}/{maxFiles})
      </Typography>

      {/* Existing photos */}
      {existingPhotos.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {existingPhotos.map((url, i) => (
            <Box key={i} sx={{ position: 'relative', width: 90, height: 90, borderRadius: '10px', overflow: 'hidden' }}>
              <img src={`${BASE_URL}${url}`} alt={`photo-${i}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
          ))}
        </Box>
      )}

      {/* New previews */}
      {previews.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {previews.map((p, i) => (
            <Box key={i} sx={{
              position: 'relative', width: 90, height: 90,
              borderRadius: '10px', overflow: 'hidden',
              border: '2px solid #1D7A8C',
            }}>
              <img src={p.url} alt={`preview-${i}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <IconButton
                size="small" onClick={() => removePreview(i)}
                sx={{
                  position: 'absolute', top: 2, right: 2,
                  bgcolor: 'rgba(0,0,0,0.6)', color: '#fff', padding: '2px',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' },
                }}
              >
                <Close sx={{ fontSize: 14 }} />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      {/* Upload area */}
      {canAdd && (
        <Box
          onClick={() => inputRef.current?.click()}
          sx={{
            border: '2px dashed #1D7A8C', borderRadius: '12px',
            p: 2.5, textAlign: 'center', cursor: 'pointer',
            bgcolor: '#f8fdfe', transition: 'all 0.2s',
            '&:hover': { bgcolor: '#e8f5f8', borderColor: '#146371' },
            mb: 2,
          }}
        >
          <CloudUpload sx={{ color: '#1D7A8C', fontSize: 32, mb: 0.5 }} />
          <Typography variant="body2" color="text.secondary">
            Click to add photos (max {maxFiles - existingPhotos.length - previews.length} more)
          </Typography>
          <Typography variant="caption" color="text.disabled">
            JPG, PNG, WebP up to 5MB each
          </Typography>
          <input
            ref={inputRef} type="file" multiple hidden
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileSelect}
          />
        </Box>
      )}

      {success && <Alert severity="success" sx={{ mb: 1.5, borderRadius: '10px' }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 1.5, borderRadius: '10px' }}>{error}</Alert>}

      {previews.length > 0 && (
        <Button
          variant="contained" fullWidth onClick={handleUpload} disabled={uploading}
          startIcon={uploading ? <CircularProgress size={18} color="inherit" /> : <PhotoCamera />}
          sx={{
            background: 'linear-gradient(135deg, #1D7A8C, #146371)',
            borderRadius: '25px', py: 1.3, textTransform: 'none', fontWeight: 600,
            '&:hover': { background: 'linear-gradient(135deg, #146371, #0f4f5c)' },
          }}
        >
          {uploading ? 'Uploading...' : `Upload ${previews.length} Photo${previews.length > 1 ? 's' : ''}`}
        </Button>
      )}
    </Box>
  );
};

export default PhotoUpload;
