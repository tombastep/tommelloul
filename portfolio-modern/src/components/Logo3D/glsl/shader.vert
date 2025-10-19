#define NUM_OCTAVES 8

uniform vec3 mousePosition;
uniform float viewportSize;
uniform float pointSize;
uniform bool shouldIntersect;
uniform float noiseTimeFactor;
uniform float noiseRadius;
uniform float noiseFactor;
uniform float noisePositionFactor;

varying vec2 vertexUV;
varying vec3 vertexPosition;

// Simplex 4D Noise by Ian McEwan, Ashima Arts

vec4 permute(vec4 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float permute(float x) {
  return floor(mod(((x * 34.0) + 1.0) * x, 289.0));
}

vec4 taylorInverseSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

float taylorInverseSqrt(float r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec4 gradient4(float j, vec4 ip) {
  const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
  vec4 p, s;
  p.xyz = floor(fract(vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
  p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
  s = vec4(lessThan(p, vec4(0.0)));
  p.xyz = p.xyz + (s.xyz * 2.0 - 1.0) * s.www;
  return p;
}

float simplexNoise(vec4 v) {
  const vec2 C = vec2(0.138196601125010504,  // (5 - sqrt(5))/20
                      0.309016994374947451); // (sqrt(5) - 1)/4

  // First corner
  vec4 i = floor(v + dot(v, C.yyyy));
  vec4 x0 = v - i + dot(i, C.xxxx);

  // Other corners
  // Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)
  vec4 i0;
  vec3 isX = step(x0.yzw, x0.xxx);
  vec3 isYZ = step(x0.zww, x0.yyz);
  i0.x = isX.x + isX.y + isX.z;
  i0.yzw = 1.0 - isX;
  i0.y += isYZ.x + isYZ.y;
  i0.zw += 1.0 - isYZ.xy;
  i0.z += isYZ.z;
  i0.w += 1.0 - isYZ.z;

  vec4 i3 = clamp(i0, 0.0, 1.0);
  vec4 i2 = clamp(i0 - 1.0, 0.0, 1.0);
  vec4 i1 = clamp(i0 - 2.0, 0.0, 1.0);

  vec4 x1 = x0 - i1 + 1.0 * C.xxxx;
  vec4 x2 = x0 - i2 + 2.0 * C.xxxx;
  vec4 x3 = x0 - i3 + 3.0 * C.xxxx;
  vec4 x4 = x0 - 1.0 + 4.0 * C.xxxx;

  // Permutations
  i = mod(i, 289.0);
  float j0 = permute(permute(permute(permute(i.w) + i.z) + i.y) + i.x);
  vec4 j1 = permute(permute(permute(permute(i.w + vec4(i1.w, i2.w, i3.w, 1.0)) 
                                    + i.z + vec4(i1.z, i2.z, i3.z, 1.0)) 
                                    + i.y + vec4(i1.y, i2.y, i3.y, 1.0)) 
                                    + i.x + vec4(i1.x, i2.x, i3.x, 1.0));

  // Gradients (7*7*6 points uniformly over a cube, mapped onto a 4-octahedron.)
  // 7*7*6 = 294, which is close to the ring size 17*17 = 289.
  vec4 ip = vec4(1.0 / 294.0, 1.0 / 49.0, 1.0 / 7.0, 0.0);

  vec4 p0 = gradient4(j0, ip);
  vec4 p1 = gradient4(j1.x, ip);
  vec4 p2 = gradient4(j1.y, ip);
  vec4 p3 = gradient4(j1.z, ip);
  vec4 p4 = gradient4(j1.w, ip);

  // Normalize gradients
  vec4 norm = taylorInverseSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  p4 *= taylorInverseSqrt(dot(p4, p4));

  // Mix contributions from the five corners
  vec3 m0 = max(0.6 - vec3(dot(x0, x0), dot(x1, x1), dot(x2, x2)), 0.0);
  vec2 m1 = max(0.6 - vec2(dot(x3, x3), dot(x4, x4)), 0.0);
  m0 = m0 * m0;
  m1 = m1 * m1;
  return 49.0 * (dot(m0 * m0, vec3(dot(p0, x0), dot(p1, x1), dot(p2, x2))) 
                + dot(m1 * m1, vec2(dot(p3, x3), dot(p4, x4))));
}

void main() {
  // Calculate displacement based on mouse position and noise
  vec3 nextPosition = position;
  vec3 direction = nextPosition - mousePosition;
  float distance = length(direction);

  float displacedCoordinate = noiseFactor * simplexNoise(vec4(position * noisePositionFactor, noiseTimeFactor));
  vec3 noiseCoordinates = vec3(displacedCoordinate, displacedCoordinate, displacedCoordinate);

  float influence = 1.0 - clamp(distance / noiseRadius, 0.0, 1.0);
  vec3 displacement = direction * influence * noiseCoordinates * 1.5;

  nextPosition.y += displacement.y * 0.2;
  nextPosition.xz += displacement.xz;

  // Apply transformation and set point size
  vec4 modelViewPosition = modelViewMatrix * vec4(shouldIntersect ? nextPosition : position, 1.0);
  gl_PointSize = (1.0 / -modelViewPosition.z) * viewportSize * pointSize;
  gl_Position = projectionMatrix * modelViewPosition;

  vertexPosition = position;
  vertexUV = uv;
}
