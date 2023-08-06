def bin_to_decimal(binary):
    decimal = 0
    for digit in binary:
        decimal = decimal * 2 + int(digit)
    return decimal

def is_binary(binary):
    return all(bit in '01' for bit in binary)

def decimal_to_binary(decimal, num_bits=8):
    binary = bin(decimal)[2:]
    return binary.zfill(num_bits)

def complemento_de_1(binary):
    complement = ''.join('1' if bit == '0' else '0' for bit in binary)
    return complement

def generate_checksum(binary):
    total_sum = bin_to_decimal(binary)
    binary_sum = decimal_to_binary(total_sum)

    if len(binary_sum) > 8:
        binary_sum = binary_sum[-8:]  

    complement = complemento_de_1(binary_sum)
    checksum = decimal_to_binary(bin_to_decimal(complement))
    return checksum.zfill(8)

def main():
    binary_input = input("Digite um número binário de 8 bits: ")
    if is_binary(binary_input) and len(binary_input) == 8:
        checksum = generate_checksum(binary_input)
        print("Complemento: ", checksum)

        decimal_value = bin_to_decimal(binary_input)
        complement_decimal_value = bin_to_decimal(complemento_de_1(binary_input))
        result_sum = decimal_value + complement_decimal_value
        result_binary = decimal_to_binary(result_sum)
        print("Resultado da soma: ", result_binary.zfill(8))
    else:
        print("Número binário inválido! Certifique-se de inserir 8 bits.")

if __name__ == "__main__":
    main()