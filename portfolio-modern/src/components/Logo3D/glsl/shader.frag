varying vec2 vertexUV;
varying vec3 vertexPosition;

uniform float viewportSize;
uniform vec3 meshColor;
uniform sampler2D pointTexture;

void main() { 
  vec2 uv = vertexUV;

  // Discard fragments outside the circle
  if (length(gl_PointCoord.xy - vec2(0.5)) > 0.5) discard;

  // Calculate normal and lighting
  vec3 normal = normalize(vertexPosition);
  vec3 lightDirection = normalize(vec3(0.0, 0.5, -1.0));
  float diffuse = max(dot(normal, lightDirection), 0.0) * 2.0 * viewportSize * 0.0000001;

  // Define the base color of the mesh
  vec3 color = meshColor / 255.0;

  // Apply texture to the point
  vec4 textureColor = texture2D(pointTexture, gl_PointCoord);
  
  // Final fragment color
  gl_FragColor = vec4(0.50, 0.50, 0.50, textureColor.a * 2.3);
}
