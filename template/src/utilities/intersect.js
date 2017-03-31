export default function intersect (array1, array2) {
  return array1.filter(item => {
    return array2.indexOf(item) > -1
  })
}
