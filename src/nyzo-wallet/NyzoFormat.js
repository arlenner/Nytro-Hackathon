
export function NyzoFormat() {}

NyzoFormat.prototype.hexStringToByteArray = function (value) {
    // From nyzo.co website, so to keep compatibility
    var firstCharacterValue = -1
    var byteArray = new Uint8Array(32)
    var byteArrayIndex = 0
    for (var i = 0; i < value.length && byteArrayIndex < 32; i++) {
        var character = value.charAt(i)
        var characterValue = parseInt(character, 16)
        if (!isNaN(characterValue)) {
            if (firstCharacterValue < 0) {
                firstCharacterValue = characterValue
            } else {
                byteArray[byteArrayIndex] = firstCharacterValue * 16 + characterValue
                firstCharacterValue = -1
                byteArrayIndex++
            }
        }
    }
    return byteArray
}


NyzoFormat.prototype.hexStringFromArrayWithDashes = function (byteArray, index=0, length=32) {
    var result = ''
    var dashCount = 0
    for (var i = index; i < index + length && i < byteArray.length; i++) {
        var byteString = byteArray[i].toString(16)
        while (byteString.length < 2) {
            byteString = '0' + byteString
        }
        result += byteString
        dashCount++
        if (dashCount == 8 && i < index + length - 1) {
            result += '-'
            dashCount = 0
        }
    }
    return result
}


NyzoFormat.prototype.hexStringFromArray = function(byteArray, index=0, length=32) {
    var result = ''
    for (var i = index; i < index + length && i < byteArray.length; i++) {
        var byteString = byteArray[i].toString(16)
        while (byteString.length < 2) {
            byteString = '0' + byteString
        }
        result += byteString
    }
    return result
}


NyzoFormat.prototype.nyzoSeedToHexString = function(nyzoSeed) {
  return nyzoSeed.split('-').join('').slice(0, 64)
}


NyzoFormat.prototype.hexStringToByteArray2 = function(nyzoSeed) {
    return Buffer.from(this.nyzoSeedToHexString(nyzoSeed), 'hex')
}

