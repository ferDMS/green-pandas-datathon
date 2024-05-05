from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

@app.route('/get_data', methods=['GET'])
def get_data():
    route_id = request.args.get('route_id')
    print(f"Received route_id: {route_id}")  # Imprime el route_id recibido

    df = pd.read_csv('merged_data_with_predictions.csv')
    print("CSV file loaded successfully")  # Confirma que el archivo CSV se cargó correctamente

    data = df[df['route_id'] == route_id]
    print(f"Found {len(data)} matching records")  # Imprime el número de registros que coinciden

    return jsonify(data.to_dict(orient='records'))