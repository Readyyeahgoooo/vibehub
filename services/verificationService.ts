// Client-side verification service using Vercel serverless function
// API key is hidden server-side, images are analyzed and discarded

const VERIFY_API_URL = "/api/verify";

export interface VerificationResult {
  verified: boolean;
  confidence: number;
  extractedUsername?: string;
  reason?: string;
}

/**
 * Convert image file to base64 for API transmission
 */
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Verify screenshot ownership using AI vision via Vercel function
 * No backend storage needed - image is analyzed and discarded
 */
export async function verifyScreenshot(
  screenshotFile: File,
  claimedUsername: string,
  sourceUrl: string
): Promise<VerificationResult> {
  try {
    // Convert image to base64
    const base64Image = await fileToBase64(screenshotFile);
    
    // Call Vercel serverless function
    const response = await fetch(VERIFY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        base64Image,
        imageType: screenshotFile.type,
        claimedUsername,
        sourceUrl
      })
    });

    if (!response.ok) {
      throw new Error(`Verification API error: ${response.status}`);
    }

    const result = await response.json();
    
    return {
      verified: result.verified || false,
      confidence: result.confidence || 0,
      extractedUsername: result.extractedUsername,
      reason: result.reason
    };
    
  } catch (error) {
    console.error("Verification failed:", error);
    return {
      verified: false,
      confidence: 0,
      reason: error instanceof Error ? error.message : "Verification failed"
    };
  }
}

/**
 * Simplified submission - no image storage needed
 */
export interface SubmissionData {
  appName: string;
  summary: string;
  tags: string[];
  creator: string;
  category: string;
  sourceUrl: string;
  language: string;
  verificationResult: VerificationResult;
}

/**
 * Submit app after verification
 * This would call a backend endpoint to store the submission
 */
export async function submitApp(data: SubmissionData): Promise<{ success: boolean; message: string }> {
  // For now, just return success
  // In production, this would call your backend API
  console.log('Submission data:', data);
  
  return {
    success: true,
    message: 'Submission received! Your app will be reviewed shortly.'
  };
}
