function Sticker(vertices, indices) {
  this.vertices = vertices;
  this.indices = indices;

  this.getSignature = function(){
    var signature = this.indices.concat();
    signature.sort();
    return signature.toString();
  }

  this.signature = this.getSignature();
};